import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import RelatedDoctors from "../components/RelatedDoctors";
import { assets } from "../assets/assets";

const Appointments = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();

    for (let i = 1; i <= 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-8">
        {/* Doctor Details */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 bg-white shadow-lg rounded-lg p-8 mb-12">
          <div className="w-full sm:w-1/3">
            <img
              className="rounded-lg shadow-xl w-full object-cover"
              src={docInfo.image}
              alt={`${docInfo.name}`}
            />
          </div>
          <div className="flex-1">
            <p className="text-3xl font-semibold text-gray-900 flex items-center gap-2">
              {docInfo.name}
              <img className="w-6" src={assets.verified_icon} alt="Verified" />
            </p>
            <div className="flex items-center gap-2 text-lg text-gray-600 mt-2">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="px-4 py-1 text-sm border rounded-full text-gray-800 bg-gray-200">
                {docInfo.experience} years
              </button>
            </div>
            <div className="mt-4">
              <p className="text-lg font-medium text-gray-900">About</p>
              <p className="text-sm text-gray-600 mt-2">{docInfo.about}</p>
            </div>
            <p className="text-gray-700 font-medium mt-4">
              Appointment Fee:{" "}
              <span className="text-lg font-semibold">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="mt-8">
          <p className="text-xl font-semibold text-gray-700 mb-4">
            Select a Date
          </p>
          <div className="flex gap-4 overflow-x-auto pb-6">
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`py-4 px-8 min-w-24 text-center rounded-lg cursor-pointer transition-all ${
                    slotIndex === index
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 border border-gray-300"
                  } hover:bg-blue-200`}
                  key={index}
                >
                  <p className="font-semibold text-lg">
                    {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                  </p>
                  <p className="text-sm">
                    {item[0] && item[0].datetime.getDate()}
                  </p>
                </div>
              ))}
          </div>

          <p className="text-xl font-semibold text-gray-700 mb-4">
            Select a Time
          </p>
          <div className="flex gap-4 overflow-x-auto pb-6">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`px-6 py-2 rounded-full cursor-pointer text-sm ${
                    item.time === slotTime
                      ? "bg-blue-500 text-white"
                      : "text-gray-500 border border-gray-300"
                  } hover:bg-blue-200`}
                  key={index}
                >
                  {item.time}
                </p>
              ))}
          </div>

          <button className="bg-blue-500 text-white text-lg font-semibold py-3 px-16 rounded-full shadow-md mt-8 hover:bg-blue-600 transition-all">
            Book An Appointment
          </button>
        </div>

        {/* Related Doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointments;
