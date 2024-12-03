const bookAppointment = async () => {
    if (!slotTime) {
      alert("Please select a time slot.");
      return;
    }
  
    try {
      const response = await fetch("/api/appointments/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: docInfo._id,
          patientName: "John Doe", // Replace with dynamic input
          patientEmail: "john.doe@example.com", // Replace with dynamic input
          patientPhone: "123-456-7890", // Replace with dynamic input
          appointmentDate: docSlots[slotIndex][0].datetime.toISOString(),
          appointmentTime: slotTime,
          reason: "Routine checkup", // Replace with dynamic input
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.message || "Failed to book the appointment");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Something went wrong. Please try again later.");
    }
  };



  