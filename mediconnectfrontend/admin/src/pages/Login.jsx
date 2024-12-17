import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Eye icons for password toggle

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const [state, setState] = useState("Login"); // Default state to Login

  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const login = async () => {
    const { data } = await axios.post(backendUrl + "/api/user/login", {
      email,
      password,
    });

    if (data?.success) {
      setToken(data.token);
      localStorage.setItem("token", data.token);
      navigate("/admin"); // Redirect to admin panel on successful login
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/admin"); // Redirect if user is already logged in
    }
  }, [token, navigate]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()} // Prevent form submission to control button actions
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        // Priority is given to the GIF background
        backgroundImage:
          "url('https://photo.safetyhandler.com/sc0/https:%2F%2Fmedia.safetyhandler.com%2Fmedia%2Fimage%2Fgif%2Fbucket%2Ff5a36ceabfbb6f240347cca1a558d957-0.gif%3Fview=image')",
        backgroundSize: "auto 100%", // Scale the height to 100% and auto adjust the width (reduces width of the GIF)
        backgroundPosition: "center", // Keeps the image centered
        backgroundColor: "rgba(173, 216, 230, 0.6)", // Light blue overlay fallback color
      }}
    >
      <div className="flex flex-col gap-6 p-6 max-w-md w-full bg-white bg-opacity-80 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Admin Panel Login
        </h2>
        <p className="text-center text-lg text-gray-600">
          Log in to access the admin panel
        </p>

        <div className="mb-4">
          <label className="block text-lg text-gray-700">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-gray-300 rounded w-full p-2 mt-2 text-lg"
            type="email"
            required
          />
        </div>

        <div className="mb-4 relative">
          <label className="block text-lg text-gray-700">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-gray-300 rounded w-full p-2 mt-2 text-lg"
            type={passwordVisible ? "text" : "password"}
            required
          />
          <span
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
          >
            {passwordVisible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </span>
        </div>

        <button
          onClick={login}
          className="bg-blue-500 text-white w-full py-2 rounded-md text-lg hover:bg-blue-600 transition duration-300"
        >
          Log In
        </button>

        <p className="text-center text-lg text-gray-600 mt-4">
          Forgot your password?{" "}
          <span
            onClick={() => setState("Reset")}
            className="text-blue-500 cursor-pointer"
          >
            Reset it here
          </span>
        </p>

        <p className="text-center text-lg text-gray-600 mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => setState("Sign Up")}
            className="text-blue-500 cursor-pointer"
          >
            Sign Up here
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
