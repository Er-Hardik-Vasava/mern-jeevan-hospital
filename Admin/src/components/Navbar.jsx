import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext.jsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const navigateTo = useNavigate();
  const { isAuthenticated, setIsAuthenticated, setAdmin } =
    useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/login");
      setIsOpen(false);
    }
  }, [isAuthenticated, navigateTo]);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const handleScroll = () => {
    setIsSticky(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logout = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/user/admin/logout",
        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(false);
      setAdmin(null);
      toast.success(data.message);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <>
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
                {["home", "admin", "doctor", "message"].map((route) => (
                  <li key={route}>
                    <NavLink
                      to={`/${route}`}
                      className={({ isActive }) =>
                        `block py-2 px-4 rounded ${
                          isActive ? "bg-gray-300" : ""
                        }`
                      }
                    >
                      {route.charAt(0).toUpperCase() + route.slice(1)}
                    </NavLink>
                  </li>
                ))}
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
                  {["home", "admin", "doctor", "message"].map((route) => (
                    <li key={route}>
                      <NavLink
                        to={`/${route}`}
                        className={({ isActive }) =>
                          `block py-2 px-4 text-white rounded ${
                            isActive ? "bg-gray-700" : ""
                          }`
                        }
                        onClick={toggleSidebar}
                      >
                        {route.charAt(0).toUpperCase() + route.slice(1)}
                      </NavLink>
                    </li>
                  ))}
                  <li>
                    <NavLink
                      to="/logout"
                      onClick={logout}
                      className={({ isActive }) =>
                        `block py-2 px-4 text-white rounded ${
                          isActive ? "bg-gray-700" : ""
                        }`
                      }
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
