import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa"; // Using react-icons for a more modern approach

const ContactInfo = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {/* Address */}
          <div className="flex flex-col items-center space-y-4 p-6 hover:bg-teal-100 hover:shadow-lg transition-all duration-300 rounded-xl transform hover:scale-105">
            <div className="bg-teal-100 p-4 rounded-full shadow-md transition-transform duration-300 hover:scale-110">
              <FaMapMarkerAlt className="text-teal-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">Address</h3>
            <p className="text-gray-600">Los Angeles Gourmand, 1230 Boriska</p>
          </div>

          {/* Hotline */}
          <div className="flex flex-col items-center space-y-4 p-6 hover:bg-teal-100 hover:shadow-lg transition-all duration-300 rounded-xl transform hover:scale-105">
            <div className="bg-teal-100 p-4 rounded-full shadow-md transition-transform duration-300 hover:scale-110">
              <FaPhoneAlt className="text-teal-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">Hotline</h3>
            <p className="text-gray-600">
              +1-877-234-44227 <br /> +1-888-365-66889
            </p>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center space-y-4 p-6 hover:bg-teal-100 hover:shadow-lg transition-all duration-300 rounded-xl transform hover:scale-105">
            <div className="bg-teal-100 p-4 rounded-full shadow-md transition-transform duration-300 hover:scale-110">
              <FaEnvelope className="text-teal-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">Email</h3>
            <p className="text-gray-600">Support@gmail.com</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
