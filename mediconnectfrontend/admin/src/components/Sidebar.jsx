import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-500 to-blue-500 border-r shadow-lg h-lvh">
      {aToken && (
        <ul className="text-white mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300 ease-in-out transform ${
                isActive
                  ? "bg-white text-teal-500 border-r-4 border-primary font-semibold"
                  : "hover:bg-[#F2F3FF] hover:text-teal-500 hover:border-l-4 hover:border-primary"
              }`
            }
            to={"/admin-dashboard"}
          >
            <img src={assets.home_icon} alt="" />
            <p className="hidden md:block">DashBoard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300 ease-in-out transform ${
                isActive
                  ? "bg-white text-teal-500 border-r-4 border-primary font-semibold"
                  : "hover:bg-[#F2F3FF] hover:text-teal-500 hover:border-l-4 hover:border-primary"
              }`
            }
            to={"/all-appointments"}
          >
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300 ease-in-out transform ${
                isActive
                  ? "bg-white text-teal-500 border-r-4 border-primary font-semibold"
                  : "hover:bg-[#F2F3FF] hover:text-teal-500 hover:border-l-4 hover:border-primary"
              }`
            }
            to={"/add-doctor"}
          >
            <img src={assets.add_icon} alt="" />
            <p>Add Doctor</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300 ease-in-out transform ${
                isActive
                  ? "bg-white text-teal-500 border-r-4 border-primary font-semibold"
                  : "hover:bg-[#F2F3FF] hover:text-teal-500 hover:border-l-4 hover:border-primary"
              }`
            }
            to={"/doctor-list"}
          >
            <img src={assets.people_icon} alt="" />
            <p className="hidden md:block">Doctors List</p>
          </NavLink>
        </ul>
      )}
      {dToken && (
        <ul className="text-white mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300 ease-in-out transform ${
                isActive
                  ? "bg-white text-teal-500 border-r-4 border-primary font-semibold"
                  : "hover:bg-[#F2F3FF] hover:text-teal-500 hover:border-l-4 hover:border-primary"
              }`
            }
            to={"/doctor-dashboard"}
          >
            <img src={assets.home_icon} alt="" />
            <p className="hidden md:block">DashBoard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300 ease-in-out transform ${
                isActive
                  ? "bg-white text-teal-500 border-r-4 border-primary font-semibold"
                  : "hover:bg-[#F2F3FF] hover:text-teal-500 hover:border-l-4 hover:border-primary"
              }`
            }
            to={"/doctor-appointments"}
          >
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300 ease-in-out transform ${
                isActive
                  ? "bg-white text-teal-500 border-r-4 border-primary font-semibold"
                  : "hover:bg-[#F2F3FF] hover:text-teal-500 hover:border-l-4 hover:border-primary"
              }`
            }
            to={"/doctor-profile"}
          >
            <img src={assets.people_icon} alt="" />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
