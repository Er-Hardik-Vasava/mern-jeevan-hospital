import React from "react";
import { Link } from "react-router-dom";
import DoctorDetails from "../components/DoctorDetails.jsx";
import NewDoctorRegister from "../components/NewDoctorRegister.jsx";

const Doctor = () => {
  return (
    <>
      <NewDoctorRegister/>
      <DoctorDetails />
    </>
  );
};

export default Doctor;
