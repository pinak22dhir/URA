import React, { useContext } from "react";
import { assets } from "../assets/assets.js";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { aToken, setAToken } = useContext(AdminContext);
    const navigate=useNavigate()

  const logout = () => {
    navigate('/')
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
  };


  return (
    <nav className="bg-gradient-to-r from-teal-500 to-blue-500 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo and Role */}
          <div className="flex items-center gap-4">
            <img
              src={assets.admin_logo}
              alt="Logo"
              className="h-12 w-12 rounded-full border-2 border-white shadow-md"
            />
            <p className="text-xl lg:text-2xl font-semibold text-white tracking-wide">
              {aToken ? "Admin Dashboard" : "Doctor Dashboard"}
            </p>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="bg-white text-teal-500 font-medium px-5 py-2 rounded-lg shadow hover:bg-gray-100 hover:scale-105 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
