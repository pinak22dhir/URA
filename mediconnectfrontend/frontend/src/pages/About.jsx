import React from 'react';
import { assets } from '../assets/assets';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16">
      {/* ABOUT US Header */}
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>

      {/* About Us Content */}
      <div className="my-10 flex flex-col md:flex-row gap-8 md:gap-12">
        <img className="w-full md:max-w-[360px] mx-auto md:mx-0" src={assets.about_image} alt="About us" />
        <div className="flex flex-col justify-center gap-4 md:gap-6 md:w-2/3 text-sm text-gray-600">
          <p>
            At MediConnect, we are dedicated to providing top-notch healthcare services to our community. Our mission is
            to deliver exceptional healthcare services that enhance the well-being of our patients through compassionate
            care and innovative practices.
          </p>
          <p>
            We aim to be a leader in the healthcare industry, recognized for our commitment to quality, patient-centered
            care, and community health improvement.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            To be a leader in the healthcare industry, recognized for our commitment to quality, patient-centered care,
            and community health improvement.
          </p>
        </div>
      </div>

      {/* WHY CHOOSE US Header */}
      <div className="text-center text-xl my-6 text-gray-500">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>

      {/* Why Choose Us Section */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-2 mb-20">
        <div className="border px-8 md:px-12 py-8 sm:py-12 flex flex-col gap-3 text-sm md:text-base hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg">
          <b>EFFICIENCY</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className="border px-8 md:px-12 py-8 sm:py-12 flex flex-col gap-3 text-sm md:text-base hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg">
          <b>CONVENIENCE</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className="border px-8 md:px-12 py-8 sm:py-12 flex flex-col gap-3 text-sm md:text-base hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg">
          <b>PERSONALIZATION</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
