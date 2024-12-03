import mongoose from "mongoose";
import doctorModel from "./doctor.js"; // Import doctor model

// Appointment Schema
const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor", // Reference to the doctor model
    required: true,
  },
  patientName: { type: String, required: true },
  patientEmail: { type: String, required: true },
  patientPhone: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending",
  },
  reason: { type: String }, // Reason for the appointment (optional)
  createdAt: { type: Date, default: Date.now },
});

// Create Appointment model
const appointmentModel =
  mongoose.models.appointment ||
  mongoose.model("appointment", appointmentSchema);

export default appointmentModel;
