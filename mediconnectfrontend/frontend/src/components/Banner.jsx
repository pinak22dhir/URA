import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-10 h-auto md:h-80 md:mx-4">
      {/* --------left side---------- */}
      <div className='flex-1 py-8 sm:py-6 md:py-12 lg:py-20 lg:pl-3'> 
      <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
      <p>Book Appointment</p>
            <p className='mt-2 sm:mt-4'>With 100+ Trusted Doctors</p>
        </div>
        <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-4 hover:scale-105 transition-all'>Create account</button>
      </div>

      {/* --------right side--------- */}
      <div className="flex justify-center md:justify-end md:items-center md:w-1/2 lg:w-[400px] mt-6 md:mt-0 relative">
        <img className='w-2/4 md:w-full h-auto max-h-72 lg:max-h-96' src={assets.appointment_img} alt="" />
      </div>
    </div>
  )
}

export default Banner
