import React from "react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const NavBar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
    dToken && setDToken("");
    dToken && localStorage.removeItem("dToken");
  };

  return (
    <div
      className="flex justify-between items-center px-4 sm:px-10 border-b text-white"
      style={{
        backgroundImage: "linear-gradient(to right, #38b2ac, #4299e1)", // Gradient used in Header
      }}
    >
      {/* Left Section */}
      <div className="flex items-center gap-2 text-xs">
        <img
          className="w-24 h-24 sm:w-24 cursor-pointer"
          src={assets.logoo}
          alt="Logo"
        />
        <p className="border px-2.5 py-0.5 rounded-full border-white text-white">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="bg-white text-blue-600 font-semibold text-sm px-10 py-2 rounded-full hover:bg-gray-200 transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default NavBar;
