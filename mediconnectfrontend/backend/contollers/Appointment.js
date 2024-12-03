import express from "express";
import appointmentModel from "./models/appointment.js"; // Appointment model
import doctorModel from "./models/doctor.js"; // Doctor model

const router = express.Router();

// Book an Appointment
router.post("/book", async (req, res) => {
  const { doctorId, patientName, patientEmail, patientPhone, appointmentDate, appointmentTime, reason } = req.body;

  try {
    // Validate input
    if (!doctorId || !patientName || !patientEmail || !appointmentDate || !appointmentTime) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Check if doctor exists
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Check if the selected slot is available
    const existingAppointment = await appointmentModel.findOne({
      doctorId,
      appointmentDate,
      appointmentTime,
    });

    if (existingAppointment) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    // Create new appointment
    const newAppointment = new appointmentModel({
      doctorId,
      patientName,
      patientEmail,
      patientPhone,
      appointmentDate,
      appointmentTime,
      reason,
    });

    const savedAppointment = await newAppointment.save();
    return res.status(201).json({ message: "Appointment booked successfully", appointment: savedAppointment });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get Appointments by Doctor ID
router.get("/:doctorId", async (req, res) => {
  const { doctorId } = req.params;

  try {
    const appointments = await appointmentModel.find({ doctorId }).sort({ appointmentDate: 1, appointmentTime: 1 });
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
