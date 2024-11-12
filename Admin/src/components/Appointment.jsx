import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/v1/appointment/get-all",
          { withCredentials: true }
        );
        if (data.success) {
          setAppointments(data.data);
        } else {
          toast.error("Failed to load appointments");
        }
      } catch (error) {
        toast.error(
          "Error fetching appointments: " +
            (error.response?.data?.message || error.message)
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      if (data.success) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === appointmentId
              ? { ...appointment, status }
              : appointment
          )
        );
        toast.success(data.message || "Status updated successfully");
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error(
        "Error updating status: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/api/v1/appointment/delete/${appointmentId}`,
        { withCredentials: true }
      );
      if (data.success) {
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment._id !== appointmentId)
        );
        toast.success("Appointment deleted successfully");
      } else {
        toast.error("Failed to delete appointment");
      }
    } catch (error) {
      toast.error(
        "Error deleting appointment: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">All Appointments</h1>
      {loading ? (
        <div className="text-center text-gray-500">Loading appointments...</div>
      ) : (
        <div className="overflow-x-auto">
          {appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="bg-white p-4 shadow-md rounded-lg border border-gray-200"
                >
                  {/* Stack appointments in a card format for mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
                    <div className="font-semibold">Patient Name:</div>
                    <div>{`${appointment.firstName} ${appointment.lastName}`}</div>

                    <div className="font-semibold">Appointment Date:</div>
                    <div>{formatDate(appointment.appointment_date)}</div>

                    <div className="font-semibold">Doctor Name:</div>
                    <div>{appointment.doctorName}</div>

                    <div className="font-semibold">Department:</div>
                    <div>{appointment.department || "N/A"}</div>

                    <div className="font-semibold">Status:</div>
                    <div>
                      <select
                        className={`border rounded-md p-1 w-full sm:w-auto ${
                          appointment.status === "Pending"
                            ? "bg-yellow-200"
                            : appointment.status === "Accepted"
                            ? "bg-green-200"
                            : "bg-red-200"
                        }`}
                        value={appointment.status}
                        onChange={(e) =>
                          handleUpdateStatus(appointment._id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>

                    <div className="font-semibold">Visited Before:</div>
                    <div>{appointment.hasVisited ? "True" : "False"}</div>

                    <div className="flex justify-start sm:justify-center gap-2">
                      <button
                        className="text-red-500"
                        onClick={() => handleDeleteAppointment(appointment._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 h-screen mt-4">
              No Appointments Found!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Appointment;
