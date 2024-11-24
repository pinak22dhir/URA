import React from 'react';
import { assets } from '../assets/frontend_assets/assets';

const Hero = () => {
  return (
    <div className="w-full">
      <img 
        src={assets.hero_img} 
        alt="Hero Banner" 
        className="w-full h-auto object-cover" 
      />
    </div>
  );
};

export default Hero;
