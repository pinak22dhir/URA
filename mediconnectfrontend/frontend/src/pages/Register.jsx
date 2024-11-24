import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { assets } from "../assets/assets";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSumbitHandler = async (event) => {
    event.preventDefault();
    console.log({ fullName, email, password, phone, birthday, gender });
  };

  return (
    <div className="min-h-[150vh] flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 w-full max-w-6xl flex flex-col md:flex-row items-center transition-transform duration-300 hover:shadow-2xl hover:scale-105">
        {/* Left Section */}
        <div className="flex-1">
          <div className="flex flex-col items-start space-y-6">
            {/* Logo */}
            <h1 className="text-4xl font-bold text-green-600 transition-all duration-300 hover:text-purple-600">
              MediConnect
            </h1>
            <p className="text-gray-600 text-lg">
              Join us to manage your health effectively!
            </p>

            {/* Registration Form */}
            <div className="w-full mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Create an Account
              </h2>
              <form className="space-y-6" onSubmit={onSumbitHandler}>
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 hover:shadow-md hover:scale-105"
                  />
                </div>
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 hover:shadow-md hover:scale-105"
                  />
                </div>
                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 hover:shadow-md hover:scale-105"
                  />
                </div>
                {/* Birthday */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Birthday
                  </label>
                  <input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 hover:shadow-md hover:scale-105"
                  />
                </div>
                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 hover:shadow-md hover:scale-105"
                  >
                    <option value="" disabled>
                      Select your gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter your password"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 hover:shadow-md hover:scale-105"
                    />
                    <div
                      className="absolute right-3 top-3 text-gray-500 cursor-pointer transition-transform duration-300 hover:scale-110"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                  </div>
                </div>

                {/* Sign Up Button */}
                <button className="w-full bg-gradient-to-r from-green-500 to-purple-500 text-white py-2 rounded-lg hover:shadow-lg hover:scale-105 hover:ring-4 hover:ring-purple-300 transition-all duration-300">
                  Sign Up
                </button>
              </form>
              <p className="mt-4 text-sm text-center text-gray-500">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-green-500 hover:underline hover:text-purple-500 transition-colors duration-300"
                >
                  Log In
                </a>
              </p>
            </div>
          </div>
        </div>
        {/* Right Section */}
        <div className="flex-1 flex flex-col justify-center items-center relative mt-8 md:mt-0">
          <div className="w-full max-w-4xl flex flex-col items-center space-y-10">
            {/* Top Cards */}
            <div className="flex justify-center space-x-6">
              {/* Card 1 */}
              <div className="group bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:bg-gradient-to-br hover:from-green-400 hover:via-blue-300 hover:to-purple-400">
                <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                  👩‍⚕
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-700 group-hover:text-white">
                    Explore Health Services
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-gray-200">
                    Get personalized recommendations today!
                  </p>
                </div>
              </div>
              {/* Card 2 */}
              <div className="group bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:bg-gradient-to-br hover:from-blue-400 hover:via-purple-300 hover:to-green-400">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                  🏥
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-700 group-hover:text-white">
                    Nearby Hospitals
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-gray-200">
                    Find trusted hospitals near your location.
                  </p>
                </div>
              </div>
            </div>

            {/* Center Image */}
            <div className="w-full max-w-sm md:max-w-md relative group transition-all duration-300">
              <img
                src={assets.doc2}
                alt="Doctor"
                className="rounded-lg shadow-lg group-hover:shadow-2xl group-hover:scale-110 group-hover:rotate-1 transition-transform duration-300"
              />
              {/* Optional Glow Effect */}
            </div>

            {/* Bottom Cards */}
            <div className="flex justify-center space-x-6">
              {/* Card 3 */}
              <div className="group bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:bg-gradient-to-br hover:from-red-400 hover:via-orange-300 hover:to-pink-400">
                <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                  💊
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-700 group-hover:text-white">
                    Medicine Tracker
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-gray-200">
                    Keep track of your prescriptions easily.
                  </p>
                </div>
              </div>
              {/* Card 4 */}
              <div className="group bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:bg-gradient-to-br hover:from-purple-400 hover:via-pink-300 hover:to-blue-400">
                <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                  🩺
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-700 group-hover:text-white">
                    Online Consultation
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-gray-200">
                    Chat with certified doctors online.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;