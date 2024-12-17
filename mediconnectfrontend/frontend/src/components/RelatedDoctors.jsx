import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({speciality, docId}) => {
    const {doctors} = useContext(AppContext)
    const navigate = useNavigate()

    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        }
    }, [doctors, speciality, docId])

    return (
        <div className='flex flex-col items-center gap-6 my-16 px-4 sm:px-10 text-gray-900'>
            <h1 className='text-4xl font-bold text-center text-blue-600'>Find and Book Specialists for Your Care</h1>
            <p className='sm:w-1/2 text-center text-gray-500 text-lg'>Discover trusted doctors tailored to your needs, with instant availability and easy booking.</p>

            {/* Doctor Cards Grid */}
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                {relDoc.slice(0, 5).map((item, index) => (
                    <div 
                        key={index} 
                        onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0, 0)}}
                        className='shadow-lg hover:shadow-xl rounded-lg overflow-hidden bg-white cursor-pointer transition-all duration-300 transform hover:-translate-y-2'>
                        {/* Doctor Image */}
                        <div className='relative'>
                            <img 
                                className='w-full h-56 object-cover' 
                                src={item.image} 
                                alt={item.name} 
                            />
                            <div className='absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full'>Available</div>
                        </div>

                        {/* Doctor Info */}
                        <div className='p-5 text-center'>
                            <p className='text-2xl font-semibold text-gray-800'>{item.name}</p>
                            <p className='text-gray-500 text-lg'>{item.speciality}</p>
                            <div className='mt-4 flex justify-center items-center gap-2 text-green-500'>
                                <span className='inline-block w-3 h-3 bg-green-500 rounded-full'></span>
                                <span className='text-sm'>Instant Booking</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* More Button */}
            <button 
                onClick={() => {navigate('/doctors'); scrollTo(0, 0)}} 
                className='bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-full mt-8 shadow-md hover:shadow-lg transition-all duration-300'>
                Browse All Doctors
            </button>
        </div>
    )
}

export default RelatedDoctors
