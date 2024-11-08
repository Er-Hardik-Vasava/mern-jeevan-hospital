import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const DoctorDetails = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [doctorDetails, setDoctorDetails] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      setLoading(true); 
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/doctors",
          { withCredentials: true }
        );

        if (response.data.success) {
          setDoctorDetails(response.data.data);
        } else {
          toast.error("Failed to fetch doctor details.");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "An error occurred while fetching doctor details.";
        toast.error(errorMessage);
        setDoctorDetails([]); 
      } finally {
        setLoading(false);
      }
    };

    
    if (isAuthenticated) {
      fetchDoctorDetails();
    }
  }, [isAuthenticated]);

  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; 
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="p-4">
      {loading ? (
        <div className="text-center text-gray-500 mt-4">
          Loading doctor details...
        </div>
      ) : doctorDetails.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctorDetails.map((doctor) => (
            <div key={doctor._id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-bold mb-2">{doctor.doctorName || "N/A"}</h2>
              <div>
                <strong>Email:</strong> {doctor.email || "N/A"}
              </div>
              <div>
                <strong>Phone:</strong> {doctor.phone || "N/A"}
              </div>
              <div>
                <strong>NIC:</strong> {doctor.nic || "N/A"}
              </div>
              <div>
                <strong>Department:</strong> {doctor.doctorDepartment || "N/A"}
              </div>
              <div>
                <strong>Date of Birth:</strong> {formatDate(doctor.dob)}
              </div>
              <div>
                <strong>Gender:</strong> {doctor.gender || "N/A"}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-4 h-screen">
          No doctor details available.
        </div>
      )}
    </div>
  );
};

export default DoctorDetails;
