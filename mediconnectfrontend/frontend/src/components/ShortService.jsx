import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import icons01 from '../assets/images/icon01.png';
import icons02 from '../assets/images/icon02.png';
import icons03 from '../assets/images/icon03.png';

const ServiceCard = ({ icon, title, description, link }) => (
  <div className='flex flex-col items-center p-5 bg-white shadow-md rounded-lg transition-transform transform hover:scale-105'>
    <div className='flex items-center justify-center mb-4'>
      <img src={icon} alt={`${title} Icon`} className='w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24' />
    </div>
    <h2 className='text-lg md:text-xl lg:text-2xl leading-7 text-headingColor font-semibold text-center'>{title}</h2>
    <p className='text-sm md:text-base leading-6 text-textColor font-light mt-2 text-center'>{description}</p>
    <Link to={link} className="mt-4 w-10 h-10 md:w-12 md:h-12 rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-secondary hover:border-transparent transition-all duration-300">
      <BsArrowRight className='group-hover:text-gray-50 w-5 h-5 md:w-6 md:h-6' />
    </Link>
  </div>
);

const ShortServices = () => {
  return (
    <>
      {/* --------------hero section end--------- */}
      <section>
        <div className='max-w-full w-[1440px] px-5 mx-auto mt-6 py-16'>
          <div className='lg:w-[1000px] mx-auto text-center '>
            <h2 className='text-3xl font-medium pr-12 items-center justify-center'>
              PROVIDING THE BEST MEDICAL SERVICES
            </h2>
            <p className='text__para md:text-base lg:text-lg mt-2 text-center text-sm'>
              "Your Trusted Partner for Expert Medical Advice and Premium Healthcare Services."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
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
              link="/locations"
            />
            <ServiceCard
              icon={icons01}
              title="Emergengy Services"
              description="Schedule your appointments with our qualified doctors."
              link="/appointments"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ShortServices;
