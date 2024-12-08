import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

import Swal from "sweetalert2";
import ContactInfo from "./ContactInfo";
import { assets } from "../assets/assets";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_bkyckdz", // Replace with your EmailJS service ID
        "template_6l4folg", // Replace with your EmailJS template ID
        form.current,
        "19YDqTWw0iweiq0pl" // Replace with your EmailJS public key
      )
      .then(
        () => {
          Swal.fire({
            title: "Success!",
            text: "Message sent successfully",
            icon: "success",
          });
          form.current.reset(); // Clear the form after submission
        },
        (error) => {
          console.error("FAILED...", error.text);
          Swal.fire({
            title: "Error!",
            text: "Message failed to send. Please try again later.",
            icon: "error",
          });
        }
      );
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-200 min-h-screen">
      {/* Contact Section */}
      <section className="container mx-auto mt-12 p-4">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-blue-700 hover:text-teal-500 transition-all duration-300">
            Contact Us
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            We'd love to hear from you!
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-10 mt-10 items-center">
          {/* Contact Image */}
          <div className="relative">
            <img
              src={assets.img} // Replace with your image path
              alt="Contact Us"
              className="rounded-lg shadow-lg w-full transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
            />
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-2xl transition-shadow duration-300">
          <form ref={form} onSubmit={sendEmail} className="space-y-5">
  {/* Sender's Name */}
  <input
    type="text"
    name="from_name"
    placeholder="Your Name"
    required
    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 hover:shadow-lg"
  />

  {/* Sender's Email */}
  <input
    type="email"
    name="from_email"
    placeholder="Your Email"
    required
    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300 hover:shadow-lg"
  />

  {/* Message Content */}
  <textarea
    name="message"
    placeholder="Your Message"
    rows="4"
    required
    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300 hover:shadow-lg"
  ></textarea>

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold transform hover:scale-105 hover:bg-teal-600 transition-all duration-300"
  >
    Send Message
  </button>
</form>

    </div>
        </div>
        <ContactInfo />
      </section>
    </div>
  );
};

export default Contact;
