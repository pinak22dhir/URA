import React from "react";
import { assets } from "../assets/assets.js";

const About = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section
        className="hero bg-cover bg-center relative text-white"
        style={{ backgroundImage: `url(${assets.about_banner})` }}
      >
        <div className="overlay absolute inset-0 bg-black bg-opacity-60 transition-all transform hover:bg-opacity-80 hover:scale-105"></div>
        <div className="container relative z-10 mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 transition-all transform hover:scale-110 hover:text-blue-600">
            Bringing health <br /> to life for the whole family.
          </h1>
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white text-lg font-medium transition-all transform hover:scale-110 hover:translate-y-1">
            Discover More
          </button>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="welcome py-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <img
            src={assets.doc1}
            alt="Doctor"
            className="rounded-lg shadow-lg transition-all transform hover:scale-110 hover:shadow-2xl hover:rotate-3"
          />
          <div className="text md:w-1/2">
            <h2 className="text-3xl font-semibold mb-4">
              Welcome To <span className="text-blue-600">MediConnect.</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <ul className="mb-6 text-gray-700">
              {[
                "Lorem ipsum dolor sit amet",
                "Consectetur adipiscing elit",
                "Eiusmod tempor incididunt ut labore",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center mb-3 hover:text-blue-600 transition-all transform hover:translate-x-1 hover:scale-105"
                >
                  <span className="w-3 h-3 bg-blue-600 rounded-full inline-block mr-3"></span>
                  {item}
                </li>
              ))}
            </ul>
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white text-lg font-medium transition-all transform hover:scale-110 hover:translate-y-1">
              About Us
            </button>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="container mx-auto px-6 lg:px-20 py-16">
        <h2 className="text-3xl font-semibold text-center mb-4">Departments</h2>
        <p className="text-gray-600 text-center mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {[
            { name: "Dentistry", icon: "🦷" },
            { name: "Cardiology", icon: "❤" },
            { name: "ENT Specialists", icon: "👂" },
            { name: "Astrology", icon: "🔮" },
            { name: "Neuroanatomy", icon: "🧠" },
            { name: "Blood Screening", icon: "🩸" },
          ].map((dept, index) => (
            <div
              key={index}
              className="border border-gray-300 hover:border-blue-600 hover:bg-blue-50 transition-all px-8 py-4 rounded-md text-center cursor-pointer shadow-sm hover:shadow-lg transform hover:scale-110 hover:translate-y-1 hover:rotate-1"
            >
              <span className="block text-4xl mb-2">{dept.icon}</span>
              <p className="font-medium">{dept.name}</p>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <img
            src={assets.doc2}
            alt="Department"
            className="rounded-lg shadow-lg transition-all transform hover:scale-110 hover:shadow-xl hover:rotate-1"
          />
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-4">
              Dentist with surgical mask holding scaler near patient
            </h3>
            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md text-white transition-all transform hover:scale-110 hover:translate-y-1">
              Make An Appointment
            </button>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="container mx-auto px-6 lg:px-20 py-16">
        <h2 className="text-3xl font-semibold text-center mb-4">Our Doctors</h2>
        <p className="text-gray-600 text-center mb-8">
          Meet our team of experts dedicated to your health.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            {
              name: "Dr. John Smith",
              specialty: "Dentist",
              image: assets.doc1,
              about:
                "Expert in advanced dental surgeries with over 10 years of experience.",
              bg: "bg-blue-50",
            },
            {
              name: "Dr. Emily Davis",
              specialty: "Cardiologist",
              image: assets.doc2,
              about:
                "Specialist in cardiac care and emergency heart surgeries.",
              bg: "bg-green-50",
            },
            {
              name: "Dr. Sarah Wilson",
              specialty: "Pediatrician",
              image: assets.doc3,
              about: "Caring for children with a holistic approach to health.",
              bg: "bg-yellow-50",
            },
          ].map((doctor, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-lg shadow-lg transition-all transform hover:scale-110 hover:shadow-2xl hover:rotate-1 ${doctor.bg}`}
            >
              <div className="h-60 w-full">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="h-full w-full object-cover object-top transition-all transform hover:scale-110 hover:translate-y-1 hover:rotate-2"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">
                  {doctor.name}
                </h3>
                <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                <p className="text-gray-600 mt-3">{doctor.about}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-800 to-transparent text-white text-center opacity-0 transition-all hover:opacity-100 hover:translate-y-2">
                <p className="text-sm">
                  Click to learn more about {doctor.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
