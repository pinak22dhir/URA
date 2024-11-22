import React from 'react';
import { assets } from '../assets/assets.js';



const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
  className="hero bg-cover bg-center relative text-white"
  style={{ backgroundImage: `url(${assets.about_banner})` }} // Replace with your image URL
>
  <div className="overlay absolute inset-0 bg-black bg-opacity-50"></div>
  <div className="container relative z-10 mx-auto px-6 py-24 text-center">
    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
      Bringing health <br /> to life for the whole family.
    </h1>
    <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white text-lg font-medium">
      Discover More
    </button>
  </div>
</section>


      {/* Welcome Section */}
      <section className="welcome py-20 bg-gray-50">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <img
            src={assets.doc1}// Replace with the doctor's image URL
            alt="Doctor"
            className="rounded-lg shadow-md"
          />
          <div className="text md:w-1/2">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Welcome To <span className="text-blue-600">MediConnect.</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <ul className="mb-6 text-gray-700">
              <li className="flex items-center mb-3">
                <span className="w-3 h-3 bg-blue-600 rounded-full inline-block mr-3"></span>
                Lorem ipsum dolor sit amet
              </li>
              <li className="flex items-center mb-3">
                <span className="w-3 h-3 bg-blue-600 rounded-full inline-block mr-3"></span>
                Consectetur adipiscing elit
              </li>
              <li className="flex items-center mb-3">
                <span className="w-3 h-3 bg-blue-600 rounded-full inline-block mr-3"></span>
                Eiusmod tempor incididunt ut labore
              </li>
            </ul>
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white text-lg font-medium">
              About Us
            </button>
          </div>
        </div>
      </section>

       {/* Departments Section */}
       <section className="container mx-auto px-6 lg:px-20">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
          Departments
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {[
            { name: "Dentistry", icon: "🦷" },
            { name: "Cardiology", icon: "❤️" },
            { name: "ENT Specialists", icon: "👂" },
            { name: "Astrology", icon: "🔮" },
            { name: "Neuroanatomy", icon: "🧠" },
            { name: "Blood Screening", icon: "🩸" },
          ].map((dept, index) => (
            <div
              key={index}
              className={`border hover:shadow-md transition duration-300 px-8 py-4 rounded-md text-center text-gray-600 cursor-pointer ${
                index === 0 && "bg-blue-50 border-blue-400 text-blue-600"
              }`}
            >
              <span className="block text-4xl mb-2">{dept.icon}</span>
              <p className="font-medium">{dept.name}</p>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <img
            src={assets.doc2} // Replace with the actual image
            alt="Department"
            className="rounded-lg shadow-md"
          />
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Dentist with surgical mask holding scaler near patient
            </h3>
            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
              suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
              lacus vel facilisis.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md text-white">
              Make An Appointment
            </button>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="container mx-auto px-6 lg:px-20 mt-16">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
          Our Doctors
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="text-center bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <img
                src={assets.doc3} // Replace with doctor image
                alt="Doctor"
                className="w-full"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-1">
                  Jhon Smith
                </h3>
                <p className="text-gray-600 text-sm mb-4">Dentist</p>
                <div className="flex justify-center space-x-4">
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href="#"
                    className="text-blue-400 hover:text-blue-600 transition"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>




  );
};

export default About;
