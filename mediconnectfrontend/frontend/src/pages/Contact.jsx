import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16">
      {/* Contact Header */}
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          CONTACT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>

      {/* Contact Content */}
      <div className="my-10 flex flex-col items-center md:flex-row md:items-start gap-10 mb-28 text-sm">
        {/* Contact Image */}
        <img className="w-full md:max-w-[360px] rounded-lg" src={assets.contact_image} alt="Contact us" />

        {/* Contact Info */}
        <div className="flex flex-col justify-center items-start gap-4 md:gap-6 text-gray-600 md:text-left">
          <p className="font-semibold text-lg text-gray-600">OUR OFFICE</p>
          <p className="text-gray-500">
            00000 Willms Station <br />
            Suite 000, Washington, USA
          </p>
          <p className="text-gray-500">
            Tel: +1-212-456-7890 <br />
            Email: mediconnect@gmail.com
          </p>
          <p className="font-semibold text-lg text-gray-600">CAREERS AT MEDICONNECT</p>
          <p className="text-gray-500">Learn more about our teams and job openings.</p>
          <button className="border border-black px-8 py-3 text-sm hover:bg-black hover:text-white transition-all duration-300 rounded-md">
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
