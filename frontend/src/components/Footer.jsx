import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return ( 
    <div className="flex flex-col min-h-screen">
      {/* Content of the page */}
      <div className="flex-grow">
        {/* Your content goes here */}
      </div>

      <footer className="bg-gray-900 text-white py-16 rounded-t-2xl shadow-lg w-full">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2 mb-2">
                <img src="https://i.pinimg.com/736x/c0/38/06/c038066a2f5259b648e4afb44acaef44.jpg" alt="SACCO Logo" className="w-10 h-10 object-contain" />
                <h4 className="text-2xl font-bold">SACCO</h4>
              </div>
              <p className="text-gray-400">Building financial futures together</p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col space-y-2">
              <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
              <Link to="about" className="text-gray-400 hover:text-white transition transform hover:scale-105 duration-300">About Us</Link>
              <Link to="service" className="text-gray-400 hover:text-white transition transform hover:scale-105 duration-300">Services</Link>
              <Link to="contact" className="text-gray-400 hover:text-white transition transform hover:scale-105 duration-300">Contact</Link>
            </div>

            {/* Legal */}
            <div className="flex flex-col space-y-2">
              <h4 className="text-xl font-semibold mb-4">Legal</h4>
              <a href="#" className="text-gray-400 hover:text-white transition transform hover:scale-105 duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition transform hover:scale-105 duration-300">Terms of Service</a>
            </div>

            {/* Social */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-xl font-semibold mb-2">Connect With Us</h4>
              <div className="flex space-x-4 items-center">
                <a href="#" className="text-gray-400 hover:text-white transition transform hover:scale-110 duration-300">
                  <FaFacebookF size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition transform hover:scale-110 duration-300">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition transform hover:scale-110 duration-300">
                  <FaLinkedinIn size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 SACCO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
