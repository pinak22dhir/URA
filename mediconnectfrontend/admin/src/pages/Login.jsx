import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import { AdminContext } from "../context/AdminContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, backendUrl } = useContext(AdminContext);

  const onSumbitHandler = async (e) => {
    e.preventDefault(); // Prevent form reload
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          console.log(data.success);
          localStorage.setItem('aToken',data.token);    //so that when we refresh we don't have to login again
          //console.log(data.token);
          setAToken(data.token);
        }           
        else{
            toast.error(data.message)       //getting invalid message in our browser
        }
      } 
    } catch (error) {
      console.error("Login failed:", error.message);
      
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-100 to-blue-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-md w-full hover:shadow-xl transition-shadow duration-300">
        {/* Animated Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6 tracking-wide transition-transform duration-500 hover:scale-110">
          {state} Login
        </h2>

        <form onSubmit={onSumbitHandler}>
          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6 relative">
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={passwordVisible ? "text" : "password"}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              placeholder="Enter your password"
            />
            {/* Show/Hide Password Button */}
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-9 text-gray-500 hover:text-blue-500 transition-colors duration-300"
            >
              {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold py-3 rounded-lg shadow-md hover:from-teal-600 hover:to-blue-600 transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* Switch Between Admin and Doctor */}
        <div className="text-center mt-6">
          {state === "Admin" ? (
            <p className="text-gray-700">
              Doctor Login?{" "}
              <span
                onClick={() => setState("Doctor")}
                className="text-blue-500 font-semibold cursor-pointer hover:underline hover:text-blue-600 transition-all duration-300"
              >
                Click here
              </span>
            </p>
          ) : (
            <p className="text-gray-700">
              Admin Login?{" "}
              <span
                onClick={() => setState("Admin")}
                className="text-blue-500 font-semibold cursor-pointer hover:underline hover:text-blue-600 transition-all duration-300"
              >
                Click here
              </span>
            </p>
          )}
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Don’t have an account?{" "}
          <a
            href="#"
            className="text-blue-500 font-semibold hover:underline hover:text-blue-600 transition-all duration-300"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
