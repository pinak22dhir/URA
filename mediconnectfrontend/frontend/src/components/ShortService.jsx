import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import icons01 from "../assets/images/icon01.png";
import icons02 from "../assets/images/icon02.png";
import icons03 from "../assets/images/icon03.png";

const ServiceCard = ({ icon, title, description, link }) => (
  <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg transition-all transform hover:scale-105 hover:shadow-xl">
    <div className="flex items-center justify-center mb-6">
      <img
        src={icon}
        alt={`${title} Icon`}
        className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 transition-all transform group-hover:scale-110"
      />
    </div>
    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-headingColor text-center">
      {title}
    </h2>
    <p className="text-sm md:text-base leading-7 text-textColor font-light mt-3 text-center">
      {description}
    </p>
    <Link
      to={link}
      className="mt-6 w-12 h-12 md:w-14 md:h-14 rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-secondary hover:border-transparent transition-all duration-300 relative"
    >
      <BsArrowRight className="group-hover:text-blue-500 w-5 h-5 md:w-6 md:h-6 transition-all duration-300" />
      <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-blue-500 transition-all duration-300"></div>
    </Link>
  </div>
);

const ShortServices = () => {
  return (
    <section className="bg-gradient-to-br from-teal-50 via-white to-teal-100 py-16">
      <div className="max-w-screen-xl px-5 mx-auto">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
            PROVIDING THE BEST MEDICAL SERVICES
          </h2>
          <p className="text-gray-600 text-sm md:text-base lg:text-lg mt-4">
            "Your Trusted Partner for Expert Medical Advice and Premium
            Healthcare Services."
          </p>
        </div>

        {/* Service Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          <ServiceCard
            icon={icons03}
            title="Find a Doctor"
            description="Find qualified doctors and book your appointments with ease."
            link="/doctors"
          />
          <ServiceCard
            icon={icons02}
            title="Find Nearby Hospitals"
            description="Locate our healthcare facilities and find the nearest one."
            link="/nearby-hospital"
          />
          <ServiceCard
            icon={icons01}
            title="Emergency Services"
            description="Schedule your appointments with our qualified doctors."
            link="/appointments"
          />
        </div>
      </div>
    </section>
  );
};

export default ShortServices;
