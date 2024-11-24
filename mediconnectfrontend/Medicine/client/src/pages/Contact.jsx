import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import Newsletter from '../components/Newsletter';

const Contact = () => {
  return (
    <div className="px-4 sm:px-10 lg:px-20 py-10 bg-gray-50">
      {/* Page Title */}
      <div className="text-center">
        <Title text1={'CONTACT '} text2={'US'} />
      </div>

      {/* Contact Section */}
      <div className="mt-10 flex flex-col md:flex-row gap-10 items-center">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            className="w-full max-w-md rounded-lg shadow-lg"
            src={assets.contact_img}
            alt="Contact"
          />
        </div>

        {/* Information Section */}
        <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
          <div className="mb-6">
            <p className="text-gray-600">
              <span className="font-semibold">Our Store:</span>
              <br />
              Janta Nagar, Dhuri, Punjab
            </p>
            <p className="text-gray-600 mt-3">
              <span className="font-semibold">Contact:</span>
              <br />
              Tel: +91 94639879809 <br /> Email: goyal.diya0212@gmail.com
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Careers at LuxeLayer</h3>
            <p className="text-gray-600 mt-2">
              Learn more about our teams and job openings.
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300">
            View Openings
          </button>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="mt-16">
        <Newsletter />
      </div>
    </div>
  );
};

export default Contact;
