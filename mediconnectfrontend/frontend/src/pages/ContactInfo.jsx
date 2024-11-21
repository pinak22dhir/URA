import React from "react";

const ContactInfo = () => {
  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {/* Address */}
          <div className="flex flex-col items-center space-y-3">
            <div className="bg-teal-100 p-4 rounded-full">
              <i className="fas fa-map-marker-alt text-teal-600 text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-700">Address</h3>
            <p className="text-gray-600">Los Angeles Gourmand, 1230 Boriska</p>
          </div>

          {/* Hotline */}
          <div className="flex flex-col items-center space-y-3">
            <div className="bg-teal-100 p-4 rounded-full">
              <i className="fas fa-phone-alt text-teal-600 text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-700">Hotline</h3>
            <p className="text-gray-600">
              +1-877-234-44227 <br /> +1-888-365-66889
            </p>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center space-y-3">
            <div className="bg-teal-100 p-4 rounded-full">
              <i className="fas fa-envelope text-teal-600 text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-700">Email</h3>
            <p className="text-gray-600">Support@gmail.com</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
