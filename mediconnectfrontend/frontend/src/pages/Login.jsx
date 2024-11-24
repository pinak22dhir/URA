import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { assets } from "../assets/assets";

const Login = () => {
  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  const [state, setState] = useState("Sign Up");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSumbitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 w-full max-w-6xl flex flex-col md:flex-row items-center transition-all duration-300 hover:shadow-2xl hover:scale-105">
        {/* Left Section */}
        <div className="flex-1">
          <div className="flex flex-col items-start space-y-6">
            {/* Logo */}
            <h1 className="text-4xl font-bold text-blue-600 transition-all duration-300 hover:text-purple-600">
              MediConnect
            </h1>
            <p className="text-gray-600 text-lg">
              Your trusted health partner.
            </p>

            {/* Sign In Form */}
            <div className="w-full mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Welcome Back!
              </h2>
              <form className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.name)}
                    value={name}
                    required
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-shadow duration-300"
                  />
                </div>
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.email)}
                    value={email}
                    required
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-shadow duration-300"
                  />
                </div>
                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      onClick={(e) => setPassword(e.target.password)}
                      required
                      value={password}
                      placeholder="Enter your password"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-shadow duration-300"
                    />
                    <div
                      className="absolute right-3 top-3 text-gray-500 cursor-pointer transition-transform duration-300 hover:scale-110"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                  </div>
                </div>

                {/* Log In Button */}
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
                  Log In
                </button>
              </form>
              <p className="mt-4 text-sm text-center text-gray-500">
                Not have an account ?
                <a href="/register" className="text-blue-500 hover:underline">
                  Create account
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex justify-center items-center relative mt-8 md:mt-0">
          <div className="w-full max-w-sm md:max-w-md hover:scale-105 transition-transform duration-300">
            <img
              src={assets.doc2}
              alt="Doctor"
              className="rounded-lg shadow-lg hover:shadow-2xl"
            />
          </div>
          {/* Additional Information */}
          <div className="absolute bottom-4 left-4 md:left-6 bg-white rounded-md shadow-md p-4 flex items-center space-x-4 transition-transform duration-300 hover:scale-105">
            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
              💬
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700">
                Connect with a Doctor
              </h3>
              <p className="text-xs text-gray-500">
                Speak with experts anytime, anywhere.
              </p>
            </div>
          </div>
          <div className="absolute top-4 right-4 md:right-6 bg-white rounded-md shadow-md p-4 flex items-center space-x-2 transition-transform duration-300 hover:scale-105">
            <div className="text-gray-700 font-medium text-sm">
              50k+ Customers
            </div>
            <div className="flex -space-x-1">
              <img
                src="https://via.placeholder.com/30"
                alt="Customer"
                className="w-6 h-6 rounded-full border border-white"
              />
              <img
                src="https://via.placeholder.com/30"
                alt="Customer"
                className="w-6 h-6 rounded-full border border-white"
              />
              <img
                src="https://via.placeholder.com/30"
                alt="Customer"
                className="w-6 h-6 rounded-full border border-white"
              />
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                +
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;