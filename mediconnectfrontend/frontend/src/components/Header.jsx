import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg px-6 md:px-10 lg:px-20 shadow-lg">
      {/* ---------- Left Side -------- */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 m-auto md:py-[8vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img
            className="w-28 hover:scale-110 transition-transform duration-300"
            src={assets.group_profiles}
            alt="Group Profiles"
          />
          <p>
            Simply browse through our extensive list of trusted doctors,
            <br className="hidden sm:block" />
            schedule your appointment hassle-free.
          </p>
        </div>
        <a
          href="#speciality"
          className="flex items-center gap-3 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-md"
        >
          Book Appointment{" "}
          <img
            className="w-3 transition-transform duration-300 hover:translate-x-1"
            src={assets.arrow_icon}
            alt="Arrow Icon"
          />
        </a>
      </div>

      {/* ---------- Right Side ---------- */}
      <div className="md:w-1/2 relative">
        <img
          className="w-full md:absolute bottom-7 h-auto rounded-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          src={assets.header_img}
          alt="Header"
        />
      </div>
    </div>
  );
};

export default Header;
