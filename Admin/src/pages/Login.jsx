import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigateTo = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        { email, password, role: "Admin" },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/home");
    }
  }, [isAuthenticated, navigateTo]);

  return (
    <div className="max-w-md mx-auto mt-28 p-10 mb-10 border bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl text-center mb-5 font-bold text-black">
        Jeevan<span className="text-gray-800 font-normal">Hospital</span>
      </h1>
      <h2 className="text-xl font-bold mb-6 text-center">LOGIN</h2>
      <h3 className="text-center mb-4">
        Only Admins Are Allowed To Access These Resources!
      </h3>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
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

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
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
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
