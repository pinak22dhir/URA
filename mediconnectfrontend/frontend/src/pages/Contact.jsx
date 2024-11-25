import React from "react";
import ContactInfo from "./ContactInfo";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <>
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
                src={assets.img} // Replace with your image URL
                alt="Contact Us"
                className="rounded-lg shadow-lg w-full transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
              />
            </div>

            {/* Contact Form */}
            <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-2xl transition-shadow duration-300">
              <form className="space-y-5">
                {/* Input for Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 hover:shadow-lg"
                  />
                </div>

                {/* Input for Email */}
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300 hover:shadow-lg"
                  />
                </div>

                {/* Input for Website */}
                <div>
                  <input
                    type="text"
                    placeholder="Website"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:shadow-lg"
                  />
                </div>

                {/* Textarea for Message */}
                <div>
                  <textarea
                    placeholder="Message"
                    rows="4"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300 hover:shadow-lg"
                  ></textarea>
                </div>

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
    </>
  );
};

export default Contact;
