import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Registration from "./pages/Registration.jsx";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Appointment from "./pages/Appoinment.jsx"
import Profile from "./pages/Profile.jsx";
import { AuthContext } from "./context/AuthContext.jsx";


function App() {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/v1/user/patient/me", {
          withCredentials: true,
        });
        setUser(data.user);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
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
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </>
  );
}

export default App;
