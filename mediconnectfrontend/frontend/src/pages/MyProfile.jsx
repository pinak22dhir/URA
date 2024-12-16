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
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    userData && (
      <div
        className="max-w-3xl mx-auto p-6 sm:p-10 bg-white shadow-2xl rounded-lg flex flex-col gap-6 text-sm animate-fade-in"
        style={{ animationDuration: "1s" }}
      >
        {isEdit ? (
          <label htmlFor="image" className="cursor-pointer self-center relative group">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary shadow-lg transform group-hover:scale-105 transition-transform duration-300">
              <img
                className="object-cover w-full h-full"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="Profile"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <img className="w-8 h-8" src={assets.upload_icon} alt="Upload Icon" />
              </div>
            </div>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
          </label>
        ) : (
          <div className="self-center">
            <img
              src={userData.image}
              className="w-40 h-40 rounded-full border-4 border-primary shadow-lg object-cover animate-scale-in"
              alt="Profile"
            />
          </div>
        )}

        {isEdit ? (
          <input
            className="bg-gray-100 text-2xl font-semibold rounded-lg px-4 py-2 border border-gray-300 w-full hover:shadow-md focus:ring-2 focus:ring-primary transition-all"
            type="text"
            value={userData.name}
            onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
          />
        ) : (
          <p className="text-3xl font-bold text-center text-primary hover:scale-105 transition-transform duration-300">
            {userData.name}
          </p>
        )}

        <hr className="my-4 border-gray-200" />

        <div className="space-y-6">
          <div>
            <p className="text-neutral-500 font-medium underline mb-3">Contact Information</p>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-y-3 text-neutral-700">
              <p className="font-medium">Email:</p>
              <p className="text-blue-500">{userData.email}</p>
              <p className="font-medium">Phone:</p>
              {isEdit ? (
                <input
                  className="bg-gray-100 px-2 py-1 rounded-lg border border-gray-300 hover:shadow-md focus:ring-2 focus:ring-primary transition-all"
                  type="text"
                  value={userData.phone}
                  onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                />
              ) : (
                <p className="text-blue-400">{userData.phone}</p>
              )}
              <p className="font-medium">Address:</p>
              {isEdit ? (
                <div>
                  <input
                    className="bg-gray-100 mb-1 px-2 py-1 rounded-lg border border-gray-300 w-full hover:shadow-md focus:ring-2 focus:ring-primary transition-all"
                    type="text"
                    value={userData.address.line1}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))
                    }
                  />
                  <input
                    className="bg-gray-100 px-2 py-1 rounded-lg border border-gray-300 w-full hover:shadow-md focus:ring-2 focus:ring-primary transition-all"
                    type="text"
                    value={userData.address.line2}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))
                    }
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

          <div>
            <p className="text-neutral-500 font-medium underline mb-3">Basic Information</p>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-y-3 text-neutral-700">
              <p className="font-medium">Gender:</p>
              {isEdit ? (
                <select
                  className="bg-gray-100 px-2 py-1 rounded-lg border border-gray-300 hover:shadow-md focus:ring-2 focus:ring-primary transition-all"
                  value={userData.gender}
                  onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
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
                  className="bg-gray-100 px-2 py-1 rounded-lg border border-gray-300 hover:shadow-md focus:ring-2 focus:ring-primary transition-all"
                  type="date"
                  value={userData.dob}
                  onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
                />
              ) : (
                <p className="text-gray-400">{userData.dob}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            className={`px-8 py-2 rounded-full transition-all font-medium transform duration-300 focus:outline-none focus:ring-4 focus:ring-primary ${
              isEdit
                ? "bg-primary text-white hover:bg-primary-dark hover:scale-105"
                : "border border-primary text-primary hover:bg-primary hover:text-white hover:scale-105"
            }`}
            onClick={isEdit ? updateUserProfileData : () => setIsEdit(true)}
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : isEdit ? "Save Information" : "Edit"}
          </button>
        </div>
      </div>
    )
  );
};

export default MyProfile;