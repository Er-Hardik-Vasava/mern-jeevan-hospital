import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 border-t-2 mt-10">
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-bold text-lg mb-2">Contact Us</h3>
            <p>Sabarmati</p>
            <p>Ahmedabad City, Gujarat, India</p>
            <p>Email: jeevanhospital@cool.com</p>
            <p>Phone: (+91) 9876543219</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">About Us</h3>
            <p>
              Jeevan Hospital is dedicated to providing exceptional healthcare
              services with a focus on patient well-being and advanced medical
              technologies.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-6 pt-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Jeevan Hospital. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
