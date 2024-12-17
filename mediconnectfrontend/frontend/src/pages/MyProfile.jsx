import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const updateUserProfileData = async () => {
    setIsUpdating(true);
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      image && formData.append("image", image);

      const { data } = await axios.post(backendUrl + "/api/user/update-profile", formData, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    userData && (
      <div
        className="flex items-start min-h-screen px-4 bg-cover bg-center"
        style={{
          backgroundImage: `url("https://thumbs.dreamstime.com/b/doctor-medical-background-19857086.jpg")`,
        }}
      >
        <div
          className="relative w-full max-w-2xl bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden p-8 mt-12 ml-8 animate-fade-in transform transition-all duration-700 hover:scale-[1.02]"
        >
          {/* Profile Image */}
          <div className="text-center">
            <label htmlFor="image" className="cursor-pointer group">
              <div className="relative w-40 h-40 mx-auto rounded-full border-8 border-blue-500 shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500">
                <img
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt="Profile"
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                {isEdit && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <img src={assets.upload_icon} alt="Upload" className="w-10 h-10 animate-pulse" />
                  </div>
                )}
              </div>
            </label>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
          </div>

          {/* User Name */}
          <div className="text-center mt-6 mb-4">
            {isEdit ? (
              <input
                className="text-4xl font-bold text-center bg-gray-200/80 border-2 border-blue-300 rounded-full p-2 focus:ring-4 ring-blue-400 shadow-md"
                type="text"
                value={userData.name}
                onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
              />
            ) : (
              <h1 className="text-4xl font-extrabold text-gray-800 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                {userData.name}
              </h1>
            )}
          </div>

          {/* Divider */}
          <div className="w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full my-6"></div>

          {/* User Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            {/* Contact */}
            <div>
              <h2 className="text-2xl font-bold text-blue-500 mb-2 flex items-center">
                <span className="mr-2">📞</span> Contact Info
              </h2>
              <p>Email: <span className="font-medium">{userData.email}</span></p>
              <p>Phone: {isEdit ? (
                <input
                  className="mt-1 w-full p-2 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-400"
                  type="text"
                  value={userData.phone}
                  onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))} />
              ) : (
                <span>{userData.phone}</span>
              )}</p>
            </div>

            {/* Basic */}
            <div>
              <h2 className="text-2xl font-bold text-blue-500 mb-2 flex items-center">
                <span className="mr-2">🗓</span> Basic Info
              </h2>
              <p>Gender: {isEdit ? (
                <select
                  className="mt-1 w-full p-2 rounded-lg border focus:ring-blue-400"
                  value={userData.gender}
                  onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              ) : (
                <span>{userData.gender}</span>
              )}</p>
              <p>DOB: {isEdit ? (
                <input
                  className="mt-1 w-full p-2 rounded-lg border focus:ring-blue-400"
                  type="date"
                  value={userData.dob}
                  onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))} />
              ) : (
                <span>{userData.dob}</span>
              )}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center mt-8">
            <button
              className="relative bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold px-6 py-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 focus:ring-4 ring-blue-300"
              onClick={isEdit ? updateUserProfileData : () => setIsEdit(true)}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-white animate-spin rounded-full mr-2"></div>
                  Saving...
                </div>
              ) : (
                isEdit ? "Save Profile" : "Edit Profile"
              )}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;
