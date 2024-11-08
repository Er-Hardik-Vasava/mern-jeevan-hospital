import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const DoctorRegistration = () => {
    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // State for each form field
    const [doctorName, setDoctorName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [nic, setNic] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [doctorDepartment, setDoctorDepartment] = useState('');

    const departmentsArray = [
        "Pediatrics", "Orthopedics", "Cardiology", "Neurology", "Oncology",
        "Radiology", "Physical Therapy", "Dermatology", "ENT",
    ];

    const doctorRegistration = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            const { data } = await axios.post(
                "http://localhost:3000/api/v1/user/doctor/add",
                { doctorName, email, phone, nic, dob, gender, password, doctorDepartment },
                { withCredentials: true, headers: { "Content-Type": "application/json" } }
            );
            toast.success(data.message);
            setIsAuthenticated(true);
            navigate('/doctor'); // Redirect after registration
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Register a New Doctor</h1>
            <form onSubmit={doctorRegistration} className="bg-white shadow-md rounded-lg p-6">
                {[{ label: "Doctor Name", value: doctorName, setValue: setDoctorName, type: "text" },
                  { label: "Email", value: email, setValue: setEmail, type: "email" },
                  { label: "Phone", value: phone, setValue: setPhone, type: "tel" },
                  { label: "NIC", value: nic, setValue: setNic, type: "text" },
                  { label: "Date of Birth", value: dob, setValue: setDob, type: "date" },
                  { label: "Password", value: password, setValue: setPassword, type: "password" }]
                .map(({ label, value, setValue, type }, index) => (
                    <div className="mb-4" key={index}>
                        <label className="block mb-2">{label}:</label>
                        <input
                            type={type}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            required
                            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                ))}
                
                <div className="mb-4">
                    <label className="block mb-2">Gender:</label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                        className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Department:</label>
                    <select
                        value={doctorDepartment}
                        onChange={(e) => setDoctorDepartment(e.target.value)}
                        required
                        className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Department</option>
                        {departmentsArray.map((depart, index) => (
                            <option value={depart} key={index}>
                                {depart}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading} // Disable button if loading
                    className={`bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Registering...' : 'Register Doctor'}
                </button>
            </form>
        </div>
    );
};

export default DoctorRegistration;
