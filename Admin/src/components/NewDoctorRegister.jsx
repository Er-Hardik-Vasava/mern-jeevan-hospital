import React from "react";
import { Link } from "react-router-dom";

const NewDoctorRegister = () => {
  return (
    <div>
      <section className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg border-b-2">
        <h1 className="text-2xl font-bold text-center mb-6">
          Create a New Doctor Registration!
        </h1>
        <p className="text-center mb-4">
          <Link
            to="/doctor-registration"
            className="text-blue-500 hover:text-blue-600 font-semibold"
          >
            Click here for Registration
          </Link>
        </p>
      </section>
    </div>
  );
};

export default NewDoctorRegister;
