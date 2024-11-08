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
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="p-4 h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">All Appointments</h1>
      {loading ? (
        <div className="text-center text-gray-500">Loading appointments...</div>
      ) : (
        <div className="overflow-x-auto">
          {appointments.length > 0 ? (
            <div className="shadow-md rounded-lg overflow-hidden">
              <div className="bg-gray-100 p-4 grid grid-cols-1 md:grid-cols-7 font-semibold">
                <div>Patient Name</div>
                <div>Appointment Date</div>
                <div>Doctor Name</div>
                <div>Department</div>
                <div>Status</div>
                <div>Visited Before</div>
                <div>Actions</div>
              </div>
              <div>
                {appointments.map((appointment) => (
                  <div
                    key={appointment._id}
                    className="grid grid-cols-1 md:grid-cols-7 p-4 border-b border-gray-200 last:border-b-0"
                  >
                    <div>{`${appointment.firstName} ${appointment.lastName}`}</div>
                    <div>{formatDate(appointment.appointment_date)}</div>
                    <div>{appointment.doctorName}</div>
                    <div>{appointment.department || "N/A"}</div>
                    <div>
                      <select
                        className={`border rounded-md p-1 ${
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
                    <div>
                      {appointment.hasVisited ? "True" : "False"}
                    </div>
                    <div>
                      <button
                        className="text-red-500"
                        onClick={() => handleDeleteAppointment(appointment._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
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
