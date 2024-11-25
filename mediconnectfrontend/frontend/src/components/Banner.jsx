import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-r from-blue-500 via-teal-400 to-blue-500 rounded-lg px-8 md:px-14 lg:px-20 my-10 h-auto md:h-96 shadow-lg overflow-hidden">
      {/* Left Side */}
      <div className="flex-1 py-10 md:py-16 lg:py-20 flex flex-col justify-center gap-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
          Book Appointment
          <br />
          <span className="text-yellow-300">With 100+ Trusted Doctors</span>
        </h1>
        <p className="text-sm sm:text-base text-white/80 max-w-md">
          Get expert consultations with highly trusted healthcare professionals. Experience seamless appointment booking and top-notch care.
        </p>
        <button
          onClick={() => {
            navigate('/login');
            scrollTo(0, 0);
          }}
          className="bg-white text-base font-semibold text-gray-700 px-6 py-3 rounded-full hover:bg-yellow-300 hover:scale-105 transition-all duration-300 w-max shadow-md"
        >
          Create Account
        </button>
      </div>

      {/* Right Side */}
      <div className="flex justify-center md:justify-end items-center mt-6 md:mt-0 md:w-1/2 lg:w-1/3 relative">
        <img
          className="w-3/4 md:w-full h-auto max-h-80 lg:max-h-96 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          src={assets.appointment_img}
          alt="Book Appointment"
        />
        {/* Decorative Circle */}
        <div className="absolute -z-10 bg-white/30 w-60 h-60 md:w-80 md:h-80 rounded-full blur-lg top-20 md:top-auto"></div>
      </div>
    </div>
  );
};

export default Banner;
