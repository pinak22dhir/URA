import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-8 px-4">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-12 tracking-wide">
        Discover Specialists
      </h1>

      {/* Horizontal Filter Section */}
      <div className="flex flex-wrap gap-6 justify-center items-center bg-white shadow-lg rounded-lg p-6 mb-12 border border-gray-200">
        {[
          "General physician",
          "Gynecologist",
          "Dermatologist",
          "Pediatricians",
          "Neurologist",
          "Gastroenterologist",
        ].map((specialty) => (
          <button
            key={specialty}
            onClick={() =>
              speciality === specialty
                ? navigate("/doctors")
                : navigate(`/doctors/${specialty}`)
            }
            className={`px-5 py-2 rounded-full font-medium text-sm border transition-all transform hover:scale-105 shadow-sm hover:shadow-md ${
              speciality === specialty
                ? "bg-teal-500 text-white border-teal-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-teal-100 hover:text-teal-700"
            }`}
          >
            {specialty}
          </button>
        ))}
      </div>

      {/* Doctor Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filterDoc.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="group relative bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 cursor-pointer transform transition-all hover:-translate-y-2 hover:shadow-xl"
          >
            {/* Doctor Image */}
            <div className="overflow-hidden h-60 bg-gray-100">
              <img
                src={item.image}
                alt={`${item.name}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                style={{
                  objectPosition: "center top", // Ensures the top of the image is prioritized for cropping
                }}
              />
            </div>

            {/* Doctor Info */}
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <p className="text-green-500 text-sm">Available</p>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-teal-500 transition-colors">
                {item.name}
              </h3>
              <p className="text-gray-500 text-sm mt-1">{item.speciality}</p>
            </div>

            {/* Call to Action */}
            <div className="absolute bottom-4 right-4 bg-teal-500 text-white text-sm font-medium px-4 py-2 rounded-full shadow-md group-hover:bg-teal-600 transition-all">
              Book Now
            </div>
          </div>
        ))}
      </div>

      {/* No Doctors Found */}
      {filterDoc.length === 0 && (
        <p className="text-center text-gray-500 text-lg mt-12">
          No doctors found for the selected specialty.
        </p>
      )}
    </div>
  );
};

export default Doctors;
