import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import RelatedDoctors from '../components/RelatedDoctors'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointments = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    setDocSlots([])

    let today = new Date()

    for (let i = 1; i <= 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        let slotDate = day + "_" + month + "_" + year
        const slotTime = formattedTime

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book an appointment')
      return navigate('/login')
    }

    try {
      const date = docSlots[slotIndex][0].datetime

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = `${day}_${month}_${year}`

      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots()
    }
  }, [docInfo])

  return docInfo && (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-white py-10 px-4 sm:px-6 lg:px-8">

      {/* Doctor Info Section */}
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8 md:flex gap-8 items-center">
        <div className="flex-shrink-0 w-40 h-40 rounded-full border-4 border-primary shadow-lg">
          <img className="w-full h-full object-cover rounded-full" src={docInfo.image} alt={docInfo.name} />
        </div>

        <div className="flex-1">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">{docInfo.name}</h2>
          <p className="text-lg text-gray-600 mt-2">{docInfo.degree} - {docInfo.speciality}</p>
          <div className="flex items-center mt-3 gap-2">
            <p className="text-sm text-gray-600">{docInfo.experience} years of experience</p>
            <span className="px-4 py-1 rounded-full text-white text-xs bg-primary">{docInfo.speciality}</span>
          </div>

          <p className="text-gray-500 mt-4">{docInfo.about}</p>

          <div className="mt-4">
            <span className="text-2xl font-semibold text-gray-900">{currencySymbol}{docInfo.fees}</span>
            <span className="text-sm text-gray-500"> / Consultation</span>
          </div>
        </div>
      </div>

      {/* Available Slots Section */}
      <div className="mt-12 max-w-7xl mx-auto">
  <h3 className="text-3xl font-semibold text-gray-900 mb-6">Select a Date & Time</h3>

  {/* Date Slots */}
  <div className="flex gap-4 overflow-x-auto">
    {docSlots.length > 0 &&
      docSlots.map((item, index) => (
        <div
          key={index}
          onClick={() => setSlotIndex(index)}
          className={`cursor-pointer w-32 h-32 flex flex-col items-center justify-center rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 ${
            slotIndex === index
              ? "bg-gradient-to-br from-blue-500 to-blue-700 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          <p className="text-lg font-semibold">
            {daysOfWeek[item[0].datetime.getDay()]}
          </p>
          <p className="text-3xl font-bold">{item[0].datetime.getDate()}</p>
          <p className="text-sm">
            {item[0].datetime.toLocaleString("default", { month: "short" })}
          </p>
        </div>
      ))}
  </div>

  {/* Time Slots */}
  <h4 className="text-2xl font-medium text-gray-900 mt-8 mb-4">Available Time Slots</h4>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {docSlots.length > 0 &&
      docSlots[slotIndex].map((item, index) => (
        <button
          key={index}
          onClick={() => setSlotTime(item.time)}
          className={`py-3 px-4 rounded-lg font-medium text-sm transition-all duration-300 shadow-sm hover:shadow-lg transform hover:scale-105 ${
            item.time === slotTime
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-blue-100"
          }`}
        >
          {item.time}
        </button>
      ))}
  </div>

  {/* Book Appointment Button */}
  <div className="flex justify-center mt-10">
    <button
      onClick={bookAppointment}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105"
    >
      Book Appointment
    </button>
  </div>
</div>

      {/* Related Doctors Section */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointments
