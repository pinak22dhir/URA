import React, { useState } from "react";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Jack",
    image: assets.profile_pic,
    email: "jack@gmail.com",
    phone: "+91 9112221121",
    address: {
      line1: "57th cross, Richmond",
      line2: "Circle, Church Road, India",
    },
    gender: "Male",
    dob: "2001-09-06",
  });

  const [isEdit, setIsEdit] = useState(false);

  const handleSave = () => {
    setIsEdit(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-opacity-70 backdrop-blur-lg py-10">
      <div className="w-2/3 bg-white shadow-xl rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 flex items-center justify-between rounded-t-xl shadow-lg">
          <div className="flex items-center gap-4">
            <img
              src={userData.image}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-md hover:shadow-xl transition-all duration-300 ease-in-out"
            />
            {isEdit ? (
              <input
                className="bg-transparent border-b border-white text-2xl font-semibold outline-none text-white focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            ) : (
              <h1 className="text-3xl font-semibold">{userData.name}</h1>
            )}
          </div>
          <button
            className="px-6 py-2 bg-white text-blue-500 font-medium rounded-full shadow-md hover:shadow-lg hover:bg-blue-100 transition-all duration-300 ease-in-out"
            onClick={() => (isEdit ? handleSave() : setIsEdit(true))}
          >
            {isEdit ? "Save" : "Edit"}
          </button>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-6">
          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-semibold text-blue-600 hover:text-blue-700 transition-all duration-300">
              Contact Information
            </h2>
            <div className="grid grid-cols-[1fr_2fr] gap-y-4 mt-4">
              <p className="font-medium">Email:</p>
              <p className="text-blue-500">{userData.email}</p>
              <p className="font-medium">Phone:</p>
              {isEdit ? (
                <input
                  className="bg-gray-100 px-3 py-1 rounded border w-full focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  type="text"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              ) : (
                <p className="text-blue-400">{userData.phone}</p>
              )}
              <p className="font-medium">Address:</p>
              {isEdit ? (
                <div>
                  <input
                    className="bg-gray-100 px-3 py-1 rounded border w-full mb-2 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    value={userData.address.line1}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    type="text"
                    placeholder="Line 1"
                  />
                  <input
                    className="bg-gray-100 px-3 py-1 rounded border w-full focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    value={userData.address.line2}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    type="text"
                    placeholder="Line 2"
                  />
                </div>
              ) : (
                <p className="text-gray-500">
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </p>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-semibold text-blue-600 hover:text-blue-700 transition-all duration-300">
              Basic Information
            </h2>
            <div className="grid grid-cols-[1fr_2fr] gap-y-4 mt-4">
              <p className="font-medium">Gender:</p>
              {isEdit ? (
                <select
                  className="bg-gray-100 px-3 py-1 rounded border w-full focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p className="text-gray-400">{userData.gender}</p>
              )}
              <p className="font-medium">Birthday:</p>
              {isEdit ? (
                <input
                  className="bg-gray-100 px-3 py-1 rounded border w-full focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  type="date"
                  value={userData.dob}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                />
              ) : (
                <p className="text-gray-400">{userData.dob}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;