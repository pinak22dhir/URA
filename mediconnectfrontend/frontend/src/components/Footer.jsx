import React from "react";
import { Link } from "react-router-dom";
import { RiLinkedinFill } from "react-icons/ri";
import {
  AiFillYoutube,
  AiFillGithub,
  AiOutlineInstagram,
} from "react-icons/ai";
import { assets } from "../assets/assets";

const socialLinks = [
  {
    path: "https://www.youtube.com/",
    icon: <AiFillYoutube className="group-hover:text-primaryColor w-5 h-5" />,
  },
  {
    path: "https://github.com/",
    icon: <AiFillGithub className="group-hover:text-primaryColor w-5 h-5" />,
  },
  {
    path: "https://www.instagram.com/",
    icon: (
      <AiOutlineInstagram className="group-hover:text-primaryColor w-5 h-5" />
    ),
  },
  {
    path: "https://www.linkedin.com/feed/",
    icon: <RiLinkedinFill className="group-hover:text-primaryColor w-5 h-5" />,
  },
];

const quickLinks01 = [
  { path: "/home", display: "Home" },
  { path: "/about", display: "About Us" },
  { path: "/services", display: "Services" },
  { path: "/blog", display: "Blog" },
];

const quickLinks02 = [
  { path: "/find-a-doctor", display: "Find a Doctor" },
  { path: "/request-appointment", display: "Request an Appointment" },
  { path: "/find-location", display: "Find a Location" },
  { path: "/get-opinion", display: "Get an Opinion" },
];

const quickLinks03 = [
  { path: "/donate", display: "Donate" },
  { path: "/contact", display: "Contact Us" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 border-t border-gray-300">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Logo and Social Links */}
          <div className="flex flex-col items-start gap-6">
            <img src={assets.logo} alt="Health Logo" className="w-32 md:w-40" />
            <p className="text-[16px] font-light leading-relaxed text-gray-600">
              © {year} Developed by Team Doc2You. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link, index) => (
                <a
                  href={link.path}
                  key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center group hover:bg-gray-600 hover:text-white transition-colors duration-300"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Sections */}
          <div className="flex flex-col gap-8 md:flex-row md:gap-12">
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Quick Links
              </h2>
              <ul className="space-y-3">
                {quickLinks01.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className="text-[16px] text-gray-600 hover:text-black transition-colors duration-300"
                    >
                      {item.display}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                I want to:
              </h2>
              <ul className="space-y-3">
                {quickLinks02.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className="text-[16px] text-gray-600 hover:text-black transition-colors duration-300"
                    >
                      {item.display}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Support
              </h2>
              <ul className="space-y-3">
                {quickLinks03.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className="text-[16px] text-gray-600 hover:text-black transition-colors duration-300"
                    >
                      {item.display}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
