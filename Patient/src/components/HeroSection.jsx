import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import doctorImage from "../assets/images/doctorImage.jpg";

const HeroSection = () => {
  const [doctorDetails, setDoctorDetails] = useState([]);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
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
          error.response?.data?.message || "An error occurred.";
        toast.error(errorMessage);
        setDoctorDetails([]);
      }
    };

    fetchDoctorDetails();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto p-4">
        <section className="relative text-gray-800 text-center py-20">
          <img
            src={doctorImage}
            alt="Doctor"
            className="absolute inset-0 w-full h-full object-cover opacity-65"
          />
          <div className="relative z-10 p-8">
            <h1 className="text-4xl md:text-5xl font-bold text-black">
              Welcome to Jeevan Hospital
            </h1>
            <p className="mt-4 text-lg md:text-xl text-black">
              Your health is our priority.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-block bg-white text-blue-500 py-2 px-4 rounded shadow hover:bg-gray-200 transition duration-300"
            >
              Learn More
            </Link>
          </div>
        </section>

        <section className="mt-10 bg-white p-6 rounded shadow">
          <h2 className="text-3xl font-bold text-center">Meet Our Team</h2>
          <div className="p-4">
            {doctorDetails.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {doctorDetails.map((doctor) => (
                  <div
                    key={doctor._id}
                    className="bg-white shadow-md rounded-lg p-4"
                  >
                    <h2 className="text-xl font-bold mb-2">
                      {doctor.doctorName}
                    </h2>
                    <div>
                      <strong>Email:</strong> {doctor.email}
                    </div>
                    <div>
                      <strong>Phone:</strong> {doctor.phone}
                    </div>
                    <div>
                      <strong>Department:</strong> {doctor.doctorDepartment}
                    </div>
                    <div>
                      <strong>Gender:</strong> {doctor.gender}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-4">
                No doctor details available.
              </div>
            )}
          </div>
        </section>

        <section className="mt-10 bg-white p-6 rounded shadow">
          <h2 className="text-3xl font-bold text-center">
            Make an Appointment
          </h2>
          <p className="mt-4 text-center">
            Schedule your appointment easily by clicking the button below.
          </p>
          <div className="flex justify-center mt-6">
            {doctorDetails.length > 0 ? (
              <Link
                to="/appointment"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
              >
                Book Appointment
              </Link>
            ) : (
              <p className="text-gray-500">
                You need to log in to make an appointment.
              </p>
            )}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-3xl font-bold text-center">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
            <div className="border p-4 rounded shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="font-semibold text-xl">Emergency Care</h3>
              <p>24/7 emergency services with expert medical professionals.</p>
            </div>
            <div className="border p-4 rounded shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="font-semibold text-xl">Maternity Care</h3>
              <p>
                Comprehensive care for mothers before, during, and after
                childbirth.
              </p>
            </div>
            <div className="border p-4 rounded shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="font-semibold text-xl">Surgical Services</h3>
              <p>Advanced surgical techniques and patient-centered care.</p>
            </div>
          </div>
        </section>

        <section className="mt-10 bg-white p-6 rounded shadow">
          <h2 className="text-3xl font-bold text-center">About Us</h2>
          <p className="mt-4 text-center">
            Jeevan Hospital is committed to providing high-quality healthcare
            services with a focus on innovation and compassion.
          </p>
        </section>

        <section className="mt-10 bg-white p-6 rounded shadow">
          <h2 className="text-3xl font-bold text-center">Testimonials</h2>
          <div className="mt-4 space-y-4">
            <blockquote className="border-l-4 border-blue-500 pl-4 italic">
              "The care I received at Jeevan Hospital was outstanding! Highly
              recommend."
              <footer className="mt-2">— Jane Doe</footer>
            </blockquote>
            <blockquote className="border-l-4 border-blue-500 pl-4 italic">
              "Wonderful staff and excellent facilities. Thank you for
              everything!"
              <footer className="mt-2">— John Smith</footer>
            </blockquote>
          </div>
        </section>

        <section className="mt-10 bg-white p-6 rounded shadow">
          <h2 className="text-3xl font-bold text-center">
            Frequently Asked Questions
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-semibold">What are your visiting hours?</h3>
              <p>We are open from 8 AM to 8 PM every day.</p>
            </div>
            <div>
              <h3 className="font-semibold">Do you accept insurance?</h3>
              <p>
                Yes, we accept most major insurance plans. Please contact us for
                details.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 bg-gray-50 p-6 rounded shadow">
          <h2 className="text-3xl font-bold text-center">Health Tips</h2>
          <ul className="mt-4 list-disc list-inside">
            <li>Stay hydrated: Drink plenty of water throughout the day.</li>
            <li>
              Eat a balanced diet: Include a variety of fruits, vegetables, and
              whole grains.
            </li>
            <li>
              Exercise regularly: Aim for at least 30 minutes of physical
              activity most days.
            </li>
            <li>
              Get enough sleep: Aim for 7-9 hours of quality sleep each night.
            </li>
          </ul>
        </section>

        <section className="mt-10 bg-white p-6 rounded shadow">
          <h2 className="text-3xl font-bold text-center">Our Facilities</h2>
          <p className="mt-4 text-center">
            Our hospital is equipped with state-of-the-art facilities to ensure
            the best possible care.
          </p>
          <ul className="mt-4 list-disc list-inside">
            <li>Modern patient rooms</li>
            <li>Advanced diagnostic imaging</li>
            <li>Fully equipped operating theaters</li>
            <li>Comprehensive rehabilitation services</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default HeroSection;
