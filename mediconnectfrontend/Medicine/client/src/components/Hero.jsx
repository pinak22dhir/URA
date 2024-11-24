import React from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { NavLink } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden group">
    {/* Hero Image */}
    <img
      src={assets.hero_img}
      alt="Hero Banner"
      className="w-full h-auto object-cover rounded-b-[150px] transform transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rounded-b-[200px]"
    />
  
    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"></div>
  
    {/* Text and Button */}
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out">
      <h1 className="text-4xl font-bold mb-4 tracking-wide text-black">Welcome to MediConnect</h1>
      <NavLink to="/collection">
      <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-semibold transition-transform duration-500 transform hover:scale-110">
        Shop Now
      </button>
      </NavLink>
    </div>
  </div>
  

  );
};

export default Hero;
