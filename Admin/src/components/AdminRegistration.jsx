import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminRegistration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/user/admin/register",
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          password,
          role: "Admin",
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (data.success) {
        toast.success(data.message);
        navigateTo("/home");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="max-w-md mx-auto mt-28 p-10 mb-10 border bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl text-center mb-5 font-bold text-black">
        Jeevan<span className="text-gray-800 font-normal">Hospital</span>
      </h1>
      <h2 className="text-xl font-bold mb-6 text-center">Admin Registration</h2>
      <h3 className="text-center mb-4">Only Admins Are Allowed To Access These Resources!</h3>
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            placeholder="Enter Your First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            placeholder="Enter Your Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            placeholder="Enter Your Phone Number"
            onChange={(e) => setPhone(e.target.value)}
            required
            pattern="[0-9]{10}"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <small className="text-gray-500">Format: 10-digit phone number</small>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nic">
            NIC
          </label>
          <input
            type="text"
            id="nic"
            value={nic}
            placeholder="Enter Your NIC"
            onChange={(e) => setNic(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
            Gender
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>Select your gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Your Password
          </label>
          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              value={password}
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700"
            >
              {isPasswordVisible ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminRegistration;
