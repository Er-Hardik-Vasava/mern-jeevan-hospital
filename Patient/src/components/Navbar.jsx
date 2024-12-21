import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const navigateTo = useNavigate();

  const { isAuthenticated, setIsAuthenticated, user, setUser } =
    useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/home");
      setIsOpen(false)
    }
  }, [isAuthenticated]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const scrollY = window.scrollY;
      setIsSticky(scrollY > 50);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logout = async () => {
    try {
      await axios.get("http://localhost:3000/api/v1/user/patient/logout", {
        withCredentials: true,
      });
      setIsAuthenticated(false);
      setUser(null);
      toast.success("Logout Successfully!");
      navigateTo("/"); 
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      {!isAuthenticated && (
        <header
          className={`bg-white text-gray-800 border-b-2 transition-shadow duration-300 mb-10 ${
            isSticky ? "shadow-lg" : ""
          } sticky top-0 left-0 right-0 z-50`}
        >
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-xl font-bold">
              Jeevan<span className="font-normal">Hospital</span>
            </div>

            <button
              onClick={toggleSidebar}
              className="md:hidden focus:outline-none"
            >
              {isOpen ? "Close" : "Menu"}
            </button>

            
            <nav className="hidden md:flex md:space-x-6">
              <ul className="flex items-center space-x-6">
                <li>
                  <NavLink
                    to="/home"
                    className={({ isActive }) =>
                      `block py-2 px-4 rounded ${isActive ? "bg-gray-300" : ""}`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `block py-2 px-4 rounded ${isActive ? "bg-gray-300" : ""}`
                    }
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      `block py-2 px-4 rounded ${isActive ? "bg-gray-300" : ""}`
                    }
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
              <ul className="ml-auto">
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `block py-2 px-4 rounded ${isActive ? "bg-gray-300" : ""}`
                    }
                  >
                    Login
                  </NavLink>
                </li>
              </ul>
            </nav>

            {/* Mobile Navigation */}
            <nav
              className={`fixed inset-0 bg-gray-800 bg-opacity-90 transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 md:hidden`}
            >
              <div className="flex flex-col items-center p-4">
                <ul className="flex flex-col space-y-4">
                  <li>
                    <NavLink
                      to="/home"
                      className={({ isActive }) =>
                        `block py-2 px-4 text-white rounded ${
                          isActive ? "bg-gray-700" : ""
                        }`
                      }
                      onClick={toggleSidebar}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        `block py-2 px-4 text-white rounded ${
                          isActive ? "bg-gray-700" : ""
                        }`
                      }
                      onClick={toggleSidebar}
                    >
                      About
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contact"
                      className={({ isActive }) =>
                        `block py-2 px-4 text-white rounded ${
                          isActive ? "bg-gray-700" : ""
                        }`
                      }
                      onClick={toggleSidebar}
                    >
                      Contact
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `block py-2 px-4 text-white rounded ${
                          isActive ? "bg-gray-700" : ""
                        }`
                      }
                      onClick={toggleSidebar}
                    >
                      Login
                    </NavLink>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>
      )}
      {isAuthenticated && (
        <header
          className={`bg-white text-gray-800 border-b-2 transition-shadow duration-300 mb-10 ${
            isSticky ? "shadow-lg" : ""
          } sticky top-0 left-0 right-0 z-50`}
        >
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-xl font-bold">
              Jeevan<span className="font-normal">Hospital</span>
            </div>

            <button
              onClick={toggleSidebar}
              className="md:hidden focus:outline-none"
            >
              {isOpen ? "Close" : "Menu"}
            </button>

            
            <nav className="hidden md:flex md:space-x-6">
              <ul className="flex items-center space-x-6">
              <li>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `block py-2 px-4 rounded ${isActive ? "bg-gray-300" : ""}`
                    }
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/home"
                    className={({ isActive }) =>
                      `block py-2 px-4 rounded ${isActive ? "bg-gray-300" : ""}`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/appointment"
                    className={({ isActive }) =>
                      `block py-2 px-4 rounded ${isActive ? "bg-gray-300" : ""}`
                    }
                  >
                    Appointment
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `block py-2 px-4 rounded ${isActive ? "bg-gray-300" : ""}`
                    }
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      `block py-2 px-4 rounded ${isActive ? "bg-gray-300" : ""}`
                    }
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
              <ul className="ml-auto">
                <li>
                  <NavLink
                    to="/logout"
                    onClick={logout}
                    className={({ isActive }) =>
                      `block py-2 px-4 rounded ${isActive ? "bg-gray-300" : ""}`
                    }
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            </nav>

            
            <nav
              className={`fixed inset-0 bg-gray-800 bg-opacity-90 transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 md:hidden`}
            >
              <div className="flex flex-col items-center p-4">
                <ul className="flex flex-col space-y-4">
                  <li>
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        `block py-2 px-4 text-white rounded ${
                          isActive ? "bg-gray-700" : ""
                        }`
                      }
                      onClick={toggleSidebar}
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/home"
                      className={({ isActive }) =>
                        `block py-2 px-4 text-white rounded ${
                          isActive ? "bg-gray-700" : ""
                        }`
                      }
                      onClick={toggleSidebar}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/appointment"
                      className={({ isActive }) =>
                        `block py-2 px-4 text-white rounded ${
                          isActive ? "bg-gray-700" : ""
                        }`
                      }
                      onClick={toggleSidebar}
                    >
                      Appointment
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        `block py-2 px-4 text-white rounded ${
                          isActive ? "bg-gray-700" : ""
                        }`
                      }
                      onClick={toggleSidebar}
                    >
                      About
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contact"
                      className={({ isActive }) =>
                        `block py-2 px-4 text-white rounded ${
                          isActive ? "bg-gray-700" : ""
                        }`
                      }
                      onClick={toggleSidebar}
                    >
                      Contact
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/logout"
                      className={({ isActive }) =>
                        `block py-2 px-4 text-white rounded ${
                          isActive ? "bg-gray-700" : ""
                        }`
                      }
                      onClick={logout}
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>
      )}
    </>
  );
};

export default Navbar;
