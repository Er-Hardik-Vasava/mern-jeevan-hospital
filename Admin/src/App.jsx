import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Admin from "./pages/Admin.jsx";
import Doctor from "./pages/Doctor.jsx";
import DoctorRegistration from "./components/DoctorRegistration.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
import Message from "./pages/Message.jsx";
import AdminRegistration from "./components/Adminregistration.jsx";


function App() {
  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/v1/user/admin/me", {
          withCredentials: true,
        });
        setAdmin(data.user);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
      }
    };
    fetchUser();
  }, [isAuthenticated]); 

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-registration" element={<AdminRegistration />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/message" element={<Message />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/doctor-registration" element={<DoctorRegistration />} />
        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </>
  );
}

export default App;
