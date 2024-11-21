import React from "react";
import image from "../assets/image.png";
import ContactInfo from "./ContactInfo";

const Contact = () => {
  return (
    <>
      <div className="bg-gray-100">
        {/* Contact Section */}
        <section className="container mx-auto mt-8 p-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-500">Contact Us</h2>
            <p className="text-gray-600 mt-2">We'd love to hear from you</p>
          </div>
          <ContactInfo />

          <div className="grid md:grid-cols-2 gap-6 mt-8 items-center">
            {/* Contact Image */}
            <div>
              <img
                src={image} // Replace with your image URL
                alt="Contact Us"
                className="rounded-lg shadow-lg w-full"
              />
            </div>

            {/* Contact Form */}
            <div className="bg-white shadow-md p-6 rounded-lg">
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Website"
                    className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Message"
                    rows="4"
                    className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-400 text-white py-3 rounded hover:bg-teal-700"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
      </div>
    </>
  );
};

export default Contact;
