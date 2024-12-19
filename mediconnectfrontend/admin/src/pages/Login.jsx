<<<<<<< HEAD
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Eye icons for password toggle

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [triggered, setTriggered] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const [backgroundImage, setBackgroundImage] = useState(""); // State to hold background image URL
=======
import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';


const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Added state for password visibility
  const [loading, setLoading] = useState(false); // Added loading state
>>>>>>> ab48e055cbc44f7eec9b70138dc4464933a3ca5d

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

<<<<<<< HEAD
  // Fetch the background image URL from the backend when the component mounts
  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/get-background-image`);
        setBackgroundImage(response.data.imageUrl); // Assuming your backend sends { imageUrl: 'some_url' }
      } catch (error) {
        toast.error("Failed to load background image");
      }
    };

    fetchBackgroundImage();
  }, [backendUrl]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (state === "Sign Up") {
      const { data } = await axios.post(backendUrl + "/api/user/register", {
        name,
        email,
        password,
      });

      if (data.success) {
        setState("OTP");
      } else {
        toast.error(data.message);
      }
    }
  };

  const signUp = async () => {
    const { data } = await axios.post(backendUrl + "/api/user/register", {
      name,
      email,
      password,
    });
    if (data.success) {
      setState("OTP");
    } else {
      toast.error(data.message);
    }
  };

  const login = async () => {
    const { data } = await axios.post(backendUrl + "/api/user/login", {
      email,
      password,
    });

    if (data?.success) {
      setState("OTP");
    } else {
      toast.error(data.message);
    }
  };

  const triggerOtp = async () => {
    const { data } = await axios.post(backendUrl + "/api/user/otp/gen", {
      email,
    });
    if (!data?.success) {
      toast.error(data.message);
    } else if (data?.message) {
      toast.info(data.message);
    }
  };

  const triggerResetOtp = async () => {
    const { data } = await axios.post(backendUrl + "/api/user/otp/gen", {
      email,
    });
    if (!data?.success) {
      toast.error(data.message);
    } else if (data?.message) {
      setTriggered(true);
      toast.info(data.message);
    }
  };

  const verifyOtp = async () => {
    const { data } = await axios.post(backendUrl + "/api/user/otp/verify", {
      email,
      password,
      otp,
    });
    if (data?.success) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
    } else {
      toast.error(data.message);
    }
  };

  const resetPassword = async () => {
    if (!email || !otp || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    const { data } = await axios.post(backendUrl + "/api/user/reset", {
      email,
      password,
      otp,
    });
    if (!data.success) {
      toast.error(data.message);
    }
    setToken(data.token);
    localStorage.setItem("token", data.token);
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('${backgroundImage}')`, // Dynamically set the background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay for better contrast
      }}
    >
      <div className="flex flex-col gap-6 p-8 max-w-md w-full bg-white bg-opacity-80 rounded-xl shadow-lg">
        <h2 className="text-4xl font-bold text-center text-gray-800">{state === "Login" ? "Admin Login" : state === "Sign Up" ? "Create an Admin Account" : state === "OTP" ? "Verify OTP" : "Reset Password"}</h2>
        <p className="text-center text-lg text-gray-600">
          {state === "Login" ? "Log in to your admin panel" : state === "Sign Up" ? "Create a new admin account" : state === "OTP" ? "Enter the OTP sent to your email" : "Reset your admin password"}
        </p>

        {state === "Reset" && (
          <div className="mb-4">
            <label className="block text-lg text-gray-700">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="border border-gray-300 rounded w-full p-3 mt-2 text-lg"
              type="email"
              required
            />
          </div>
        )}

        {state === "Sign Up" && (
          <div className="mb-4">
            <label className="block text-lg text-gray-700">Full Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border border-gray-300 rounded w-full p-3 mt-2 text-lg"
              type="text"
              required
            />
          </div>
        )}

        {(state === "OTP" || state === "Reset") && (
          <div className="mb-4">
            <label className="block text-lg text-gray-700">OTP</label>
            <input
              disabled={state === "Reset" && !triggered}
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              className="border border-gray-300 rounded w-full p-3 mt-2 text-lg"
              type="number"
              required
            />
          </div>
        )}

        {(state === "Login" || state === "Sign Up") && (
          <>
            <div className="mb-4">
              <label className="block text-lg text-gray-700">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border border-gray-300 rounded w-full p-3 mt-2 text-lg"
                type="email"
                required
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-lg text-gray-700">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border border-gray-300 rounded w-full p-3 mt-2 text-lg"
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
          </>
        )}

        {state === "OTP" && (
          <button
            onClick={triggerOtp}
            className="bg-blue-500 text-white w-full py-3 rounded-md text-lg hover:bg-blue-600 transition duration-300"
          >
            Resend OTP
          </button>
        )}

        {state === "Reset" && (
          <button
            onClick={triggerResetOtp}
            className="bg-blue-500 text-white w-full py-3 rounded-md text-lg hover:bg-blue-600 transition duration-300"
          >
            Send OTP
          </button>
        )}

        {state === "Reset" && triggered && (
          <div className="mb-4">
            <label className="block text-lg text-gray-700">New Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border border-gray-300 rounded w-full p-3 mt-2 text-lg"
              type="password"
              required
            />
          </div>
        )}

        {state === "OTP" && (
          <button
            onClick={verifyOtp}
            className="bg-blue-500 text-white w-full py-3 rounded-md text-lg hover:bg-blue-600 transition duration-300"
          >
            Verify OTP
          </button>
        )}

        {state === "Sign Up" && (
          <button
            onClick={signUp}
            className="bg-blue-500 text-white w-full py-3 rounded-md text-lg hover:bg-blue-600 transition duration-300"
          >
            Create Admin Account
          </button>
        )}

        {state === "Login" && (
          <button
            onClick={login}
            className="bg-blue-500 text-white w-full py-3 rounded-md text-lg hover:bg-blue-600 transition duration-300"
          >
            Log In
          </button>
        )}

        {state === "Reset" && (
          <button
            onClick={resetPassword}
            className="bg-blue-500 text-white w-full py-3 rounded-md text-lg hover:bg-blue-600 transition duration-300"
          >
            Reset Password
          </button>
        )}

        <p className="text-center text-lg text-gray-600 mt-4">
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-blue-500 cursor-pointer"
              >
                Login here
              </span>
            </>
          ) : state === "Reset" ? (
            <>
              Back to{" "}
              <span
                onClick={() => setState("Login")}
                className="text-blue-500 cursor-pointer"
              >
                Login
              </span>
            </>
          ) : (
            <>
              Forgot your password?{" "}
              <span
                onClick={() => setState("Reset")}
                className="text-blue-500 cursor-pointer"
              >
                Reset it here
              </span>
            </>
          )}
        </p>
      </div>
    </form>
=======
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
          toast.success('Admin login successful!');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, { email, password });
        if (data.success) {
          localStorage.setItem('dToken', data.token);
          setDToken(data.token);
          toast.success('Doctor login successful!');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRHg1YOP22jD85skc-stYZZmdhWsVyrPGiGw&s")`,
      }}
    >
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-[400px] border rounded-xl bg-white/80 text-[#333] shadow-lg backdrop-blur-md"
      >
        <p className="text-2xl font-bold text-center w-full">
          {state} <span className="text-blue-400">Login</span>
        </p>
        <div className="w-full">
          <label className="block text-sm font-medium">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-gray-300 rounded w-full p-2 mt-1 focus:outline-blue-600"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="w-full relative">
          <label className="block text-sm font-medium">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-gray-300 rounded w-full p-2 mt-1 focus:outline-blue-600"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            required
          />
          <span
            className="absolute mt-3 right-3 top-[50%] translate-y-[-50%] text-gray-600 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
          </span>
        </div>
        <button
          disabled={loading}
          className={`w-full py-2 rounded-md text-white text-base ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary cursor-pointer'
          }`}
        >
          {loading ? 'Processing...' : 'Login'}
        </button>
        {state === 'Admin' ? (
          <p className="text-sm text-gray-600">
            Doctor Login?{' '}
            <span
              className="text-blue-600 underline cursor-pointer"
              onClick={() => setState('Doctor')}
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            Admin Login?{' '}
            <span
              className="text-blue-400 underline cursor-pointer"
              onClick={() => setState('Admin')}
            >
              Click here
            </span>
          </p>
        )}
      </form>
    </div>
>>>>>>> ab48e055cbc44f7eec9b70138dc4464933a3ca5d
  );
};

export default Login;
