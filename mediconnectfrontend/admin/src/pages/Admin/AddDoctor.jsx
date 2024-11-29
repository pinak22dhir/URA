import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons from react-icons

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null); // Initialize docImg as null, not false
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [showPassword, setShowPassword] = useState(false); // Password visibility state

  // Get backend URL and token from context
  const { backendUrl, aToken } = useContext(AdminContext);

  // Submit handler function
  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Prevent page reload on form submission

    // Check if doctor image is selected
    if (!docImg) {
      return toast.error("Image not Selected");
    }
    setLoading(true);
    const formData = new FormData();

    formData.append("image", docImg);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("experience", experience);
    formData.append("fees", Number(fees));
    formData.append("about", about);
    formData.append("speciality", speciality);
    formData.append("degree", degree);
    formData.append(
      "address",
      JSON.stringify({ line1: address1, line2: address2 })
    );

    // Debug: console log FormData
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    // API call to backend
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        {
          headers: { aToken },
        }
      );

      // Check if the API response was successful
      if (data.success) {
        toast.success(data.message);
        // Reset form states
        setDocImg(null);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFees("");
        setAbout("");
        setSpeciality("General physician");
        setDegree("");
        setAddress1("");
        setAddress2("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full max-w-5xl mx-auto">
      <p className="mb-4 text-2xl font-bold text-center text-gray-700">
        Add Doctor
      </p>

      <div className="bg-white shadow-lg rounded-lg px-8 py-8 border w-full space-y-8">
        {/* Doctor Image Upload */}
        <div className="flex items-center gap-4 mb-6 text-gray-500 hover:text-gray-700 transition-all duration-300">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="w-20 h-20 bg-gray-100 rounded-full border-2 border-gray-300 p-1"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Doctor"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p className="text-sm">
            Upload doctor <br /> picture
          </p>
        </div>

        {/* Doctor Form */}
        <div className="flex flex-col lg:flex-row items-start gap-6 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            {/* Name */}
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-gray-700 font-semibold">Doctor Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                type="text"
                placeholder="Name"
                required
              />
            </div>
            {/* Email */}
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-gray-700 font-semibold">Doctor Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            {/* Password */}
            <div className="flex-1 flex flex-col gap-1 relative">
              <p className="text-gray-700 font-semibold">Doctor Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
              />
              {/* Eye Icon for Password */}
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer align-middle mt-3.5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
            </div>
            {/* Experience */}
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-gray-700 font-semibold">Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              >
                {[
                  "1 Year",
                  "2 Year",
                  "3 Year",
                  "4 Year",
                  "5 Year",
                  "6 Year",
                  "7 Year",
                  "8 Year",
                  "9 Year",
                  "10 Year",
                ].map((exp) => (
                  <option key={exp} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
            </div>
            {/* Fees */}
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-gray-700 font-semibold">Fees</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                type="number"
                placeholder="Fees"
                required
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            {/* Specialty */}
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-gray-700 font-semibold">Specialty</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              >
                {[
                  "General physician",
                  "Gynecologist",
                  "Dermatologist",
                  "Pediatricians",
                  "Neurologist",
                  "Gastroenterologist",
                ].map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>

            {/* Education */}
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-gray-700 font-semibold">Education</p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                type="text"
                placeholder="Education"
                required
              />
            </div>

            {/* Address */}
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-gray-700 font-semibold">Address</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                type="text"
                placeholder="Address 1"
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                type="text"
                placeholder="Address 2"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <p className="mt-4 mb-2 text-gray-700 font-semibold">About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full px-4 pt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
            placeholder="Write about doctor"
            rows={5}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading} // Disable the button when loading
          className={`w-full py-3 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50 
            ${
              loading
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-400 hover:to-blue-400"
            }`}
        >
          {loading ? "Adding Doctor..." : "Add Doctor"}
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
