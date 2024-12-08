import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { assets } from "../assets/assets";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Simulate an API call
    setTimeout(() => {
      console.log({ fullName, email, password });
      setIsSubmitting(false);
      alert("Registration Successful!");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-6xl flex flex-col md:flex-row items-center transition-transform duration-500 hover:shadow-xl hover:scale-[1.02]">
        {/* Left Section */}
        <div className="flex-1">
          <div className="flex flex-col items-start space-y-6">
            {/* Logo */}
            <h1 className="text-4xl font-bold text-purple-600 transition-all duration-500 hover:text-pink-600">
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
              <form className="space-y-6" onSubmit={onSubmitHandler}>
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
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-500 hover:shadow-md hover:scale-[1.02]"
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
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-500 hover:shadow-md hover:scale-[1.02]"
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter your password"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-500 hover:shadow-md hover:scale-[1.02]"
                    />
                    <div
                      className="absolute right-3 top-3 text-gray-500 cursor-pointer transition-transform duration-500 hover:scale-[1.1]"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                  </div>
                </div>

                {/* Register Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg hover:shadow-lg transition-all duration-500 ${
                    isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:scale-[1.03]"
                  }`}
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </button>
              </form>
              <p className="mt-4 text-sm text-center text-gray-500">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-purple-500 hover:underline hover:text-pink-500 transition-colors duration-500"
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
              <div className="group bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl">
                <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center group-hover:scale-[1.1] transition-transform duration-500">
                  👩‍⚕
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-700 group-hover:text-gray-800">
                    Explore Health Services
                  </h3>
                  <p className="text-sm text-gray-500">
                    Get personalized recommendations today!
                  </p>
                </div>
              </div>
            </div>

            {/* Center Image */}
            <div className="w-full max-w-sm md:max-w-md relative group transition-all duration-500">
              <img
                src={assets.doc2}
                alt="Doctor"
                className="rounded-lg shadow-lg group-hover:scale-[1.03] transition-transform duration-500"
              />
            </div>

            {/* Bottom Cards */}
            <div className="flex justify-center space-x-6">
              <div className="group bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl">
                <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center group-hover:scale-[1.1] transition-transform duration-500">
                  💊
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-700 group-hover:text-gray-800">
                    Medicine Tracker
                  </h3>
                  <p className="text-sm text-gray-500">
                    Keep track of your prescriptions easily.
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
