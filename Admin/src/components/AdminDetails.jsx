import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AdminDetails = () => {
  const [adminDetails, setAdminDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/admin/me",
          { withCredentials: true }
        );
        setAdminDetails(response.data.data);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message || "Failed to fetch admin details.");
        } else {
          toast.error("An error occurred. Please try again later.");
        }
        setAdminDetails(null);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchAdminDetails();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Format date function to DD/MM/YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Handle empty or invalid date
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Format as DD/MM/YYYY
  };

  return (
    <div className="p-4">
      {loading ? (
        <div className="text-center text-gray-500 mt-4">Loading admin details...</div>
      ) : (
        adminDetails ? (
          <div className="bg-white rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Details</h1>
            <div className="space-y-2">
              <div><strong>First Name:</strong> {adminDetails.firstName || "N/A"}</div>
              <div><strong>Last Name:</strong> {adminDetails.lastName || "N/A"}</div>
              <div><strong>Email:</strong> {adminDetails.email || "N/A"}</div>
              <div><strong>Phone:</strong> {adminDetails.phone || "N/A"}</div>
              <div><strong>NIC:</strong> {adminDetails.nic || "N/A"}</div>
              <div><strong>Date of Birth:</strong> {formatDate(adminDetails.dob)}</div>
              <div><strong>Gender:</strong> {adminDetails.gender || "N/A"}</div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-4 h-screen">No admin details available.</div>
        )
      )}
    </div>
  );
};

export default AdminDetails;
