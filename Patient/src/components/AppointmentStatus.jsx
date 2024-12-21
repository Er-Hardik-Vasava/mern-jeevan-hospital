import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AppointmentStatus = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointmentStatus = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:3000/api/v1/appointment/get-my", { withCredentials: true });
        if (data.success) {
          setAppointments(data.data);
        } else {
          toast.error(data.message || "Failed to load appointments");
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointmentStatus();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 mt-14">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Appointments</h2>
      {appointments.length === 0 ? (
        <p className="text-gray-500 text-center">No appointments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 max-md:hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Date</th>
                <th className="border border-gray-300 p-2">Doctor</th>
                <th className="border border-gray-300 p-2">Department</th>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">Visited Before</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2 text-center">{appointment.firstName || "N/A"} {appointment.lastName || "N/A"}</td>
                  <td className="border border-gray-300 p-2 text-center">{formatDate(appointment.appointment_date) || "N/A"}</td>
                  <td className="border border-gray-300 p-2 text-center">{appointment.doctorName || "N/A"}</td>
                  <td className="border border-gray-300 p-2 text-center">{appointment.department || "N/A"}</td>
                  <td className="border border-gray-300 p-2 text-center">{appointment.status || "N/A"}</td>
                  <td className="border border-gray-300 p-2 text-center">{appointment.hasVisited ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
     
      <div className="block md:hidden">
        {appointments.map((appointment) => (
          <div key={appointment._id} className="border border-gray-300 p-4 rounded-lg shadow mb-4">
            <h3 className="font-semibold">{appointment.firstName || "N/A"} {appointment.lastName || "N/A"}</h3>
            <p><strong>Date:</strong> {formatDate(appointment.appointment_date) || "N/A"}</p>
            <p><strong>Doctor:</strong> {appointment.doctorName || "N/A"}</p>
            <p><strong>Department:</strong> {appointment.department || "N/A"}</p>
            <p><strong>Status:</strong> {appointment.status || "N/A"}</p>
            <p><strong>Visited Before:</strong> {appointment.hasVisited ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentStatus;
