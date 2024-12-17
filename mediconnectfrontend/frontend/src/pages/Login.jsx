import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Eye icons for password toggle
import { Link } from 'react-router-dom'; // Import Link for navigation

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [triggered, setTriggered] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

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
        backgroundImage:
          "url('https://photo.safetyhandler.com/sc0/https:%2F%2Fmedia.safetyhandler.com%2Fmedia%2Fimage%2Fgif%2Fbucket%2Ff5a36ceabfbb6f240347cca1a558d957-0.gif%3Fview=image')", // New background GIF URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay for better contrast
      }}
    >
      <div className="flex flex-col gap-6 p-8 max-w-md w-full bg-white bg-opacity-80 rounded-xl shadow-lg">
        <h2 className="text-4xl font-bold text-center text-gray-800">
          {state === "Login"
            ? "Login"
            : state === "Sign Up"
            ? "Sign Up"
            : state === "OTP"
            ? "Verify OTP"
            : "Reset Password"}
        </h2>
        <p className="text-center text-lg text-gray-600">
          {state === "Login"
            ? "Log in to access your account"
            : state === "Sign Up"
            ? "Create a new account"
            : state === "OTP"
            ? "Enter the OTP sent to your email"
            : "Reset your password"}
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
            Create Account
          </button>
        )}

        {state === "Login" && (
          <>
            <button
              onClick={login}
              className="bg-blue-500 text-white w-full py-3 rounded-md text-lg hover:bg-blue-600 transition duration-300"
            >
              Log In
            </button>
            <Link to="http://localhost:5174/" className="text-blue-500 text-2xl font-semibold text-center cursor-pointer hover:text-blue-700 transform hover:translate-y-[-3px] transition-all duration-300 hover:shadow-lg">
      <h1>Login as Admin</h1>
    </Link>
          </>
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
  );
};

export default Login;
