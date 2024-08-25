import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { GrTapeOption } from 'react-icons/gr';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-400 via-pink-700 to-purple-500 text-white py-8 border-t-2 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <GrTapeOption className="text-purple-900 mr-2 text-3xl" />
            <span className="text-2xl font-bold">
              <Link to="/">Story Teller</Link>
            </span>
          </div>

          {/* Footer Links */}
          <div className="flex space-x-6">
            <Link to="/" className="hover:text-purple-400">Home</Link>
            <Link to="/storyinsights" className="hover:text-purple-400">Story Insights</Link>
            <Link to="/about" className="hover:text-purple-400">About</Link>
            <Link to="/contact" className="hover:text-purple-400">Contact</Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://facebook.com" className="hover:text-purple-400">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" className="hover:text-purple-400">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" className="hover:text-purple-400">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center text-gray-400">
          © 2024 Story Teller. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
