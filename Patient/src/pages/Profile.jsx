import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const Profile = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [profileDetails, setProfileDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    const fetchProfileDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/patient/me",
          { withCredentials: true }
        );

        if (response.data.success) {
          setProfileDetails(response.data.data);
        } else {
          toast.error("Failed to fetch profile details.");
        }
      } catch (error) {
        toast.error(error.response.data.message);
        setProfileDetails({});
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchProfileDetails();
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/v1/user/patient/logout", {
        withCredentials: true,
      });
      setIsAuthenticated(false);
      toast.success("Logout Successfully!");
      navigate("/home"); // Use navigate to redirect
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Utility function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Profile Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <p className="mt-1">{profileDetails.firstName || "N/A"}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <p className="mt-1">{profileDetails.lastName || "N/A"}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1">{profileDetails.email || "N/A"}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <p className="mt-1">{profileDetails.phone || "N/A"}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">NIC</label>
              <p className="mt-1">{profileDetails.nic || "N/A"}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <p className="mt-1">{formatDate(profileDetails.dob)}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <p className="mt-1">{profileDetails.gender || "N/A"}</p>
            </div>
          </div>
          <div className="mt-6">
            <button 
              onClick={handleLogout}
              className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
