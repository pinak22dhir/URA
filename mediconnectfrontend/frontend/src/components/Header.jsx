import React, { useState } from "react";
import { assets } from "../assets/assets";

const Header = () => {
  // State to track the button's clicked status
  const [isClicked, setIsClicked] = useState(false);

  // Function to handle button click
  const handleButtonClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-lg shadow-xl p-6 md:p-16">
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
          onClick={handleButtonClick} // Handle button click
          className={`flex items-center gap-3 px-8 py-3 rounded-full text-sm m-auto md:m-0 transition-all duration-300 shadow-md ${
            isClicked
              ? "bg-black text-white hover:bg-gray-700" // Black when clicked
              : "bg-white text-gray-600 hover:bg-gray-200 hover:scale-105"
          }`}
        >
          Book Appointment{" "}
          <img
            className="w-3 transition-transform duration-300 hover:translate-x-1"
            src={assets.arrow_icon}
            alt="Arrow Icon"
          />
        </a>
      </div>

      {/* ---------- Right Side (Image) ---------- */}
      <div className="md:w-1/2 relative mt-8 md:mt-0">
        <img
          className="w-full h-auto rounded-lg shadow-xl transform transition duration-500 hover:scale-105"
          src="https://cdn.dribbble.com/users/2273038/screenshots/5193715/media/98f094ca207a995be2f6595a4c4d0048.gif"
          alt="Doctor Appointment"
        />
      </div>
    </div>
  );
};

export default Header;
