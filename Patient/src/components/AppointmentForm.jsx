import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [doctorName, setDoctorName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:3000/api/v1/user/doctors", { withCredentials: true });
        setDoctors(data.data);
      } catch (error) {
        toast.error("Failed to load doctors");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleAppointment = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { data } = await axios.post("http://localhost:3000/api/v1/appointment/post", {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date: appointmentDate,
        department,
        doctorName,
        hasVisited,
        address,
      }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      toast.success(data.message);
      resetFormFields();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setSubmitting(false);
    }
  };

  const resetFormFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setNic("");
    setDob("");
    setGender("");
    setAppointmentDate("");
    setDepartment("Pediatrics");
    setDoctorName("");
    setHasVisited(false);
    setAddress("");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Appointment</h2>
      <form onSubmit={handleAppointment}>
        {/* Patient Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 text-sm font-medium">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Phone</label>
            <input
              type="tel"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 text-sm font-medium">NIC</label>
            <input
              type="text"
              placeholder="NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Date Of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-400"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Appointment Date</label>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Department and Doctor Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Department Name</label>
            <select
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setDoctorName(""); // Reset doctor name on department change
              }}
              required
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-400"
            >
              {departmentsArray.map((depart, index) => (
                <option value={depart} key={index}>
                  {depart}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Doctor Name</label>
            {loading ? (
              <p className="text-gray-500">Loading doctors...</p>
            ) : (
              <select
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                disabled={!department}
                required
                className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-400"
              >
                <option value="">Select Doctor</option>
                {doctors
                  .filter((doctor) => doctor.doctorDepartment === department)
                  .map((doctor, index) => (
                    <option value={doctor.doctorName} key={index}>
                      {doctor.doctorName}
                    </option>
                  ))}
              </select>
            )}
          </div>
        </div>

        {/* Address and Visit History */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Address</label>
          <textarea
            rows="5"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            required
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={hasVisited}
            onChange={(e) => setHasVisited(e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm">Have you visited this doctor before?</label>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`w-full bg-blue-500 text-white font-bold py-2 rounded-lg ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {submitting ? "Submitting..." : "Submit Appointment"}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
