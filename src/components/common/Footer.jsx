import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaStethoscope,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">

      {/* Main Footer */}
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">

        {/* Brand */}
        <div>
          <NavLink to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <FaStethoscope size={19} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">
                Medi<span className="text-blue-500">Care</span>
              </h2>

              <p className="text-[9px] tracking-widest text-gray-500">
                HEALTHCARE
              </p>
            </div>
          </NavLink>

          <p className="mt-5 max-w-xs text-sm leading-6 text-gray-400">
            Find trusted doctors, book appointments, and
            manage your healthcare journey with ease.
          </p>

          {/* Social Icons */}
          <div className="mt-6 flex gap-3">
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 text-gray-400 transition hover:bg-blue-600 hover:text-white"
            >
              <FaFacebookF size={14} />
            </a>

            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 text-gray-400 transition hover:bg-blue-600 hover:text-white"
            >
              <FaInstagram size={14} />
            </a>

            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 text-gray-400 transition hover:bg-blue-600 hover:text-white"
            >
              <FaTwitter size={14} />
            </a>

            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 text-gray-400 transition hover:bg-blue-600 hover:text-white"
            >
              <FaLinkedinIn size={14} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white">
            Quick Links
          </h3>

          <div className="mt-5 flex flex-col gap-3 text-sm">
            <NavLink to="/" className="transition hover:text-blue-500">
              Home
            </NavLink>

            <NavLink
              to="/doctors"
              className="transition hover:text-blue-500"
            >
              Doctors
            </NavLink>

            <NavLink
              to="/appointment"
              className="transition hover:text-blue-500"
            >
              Appointment
            </NavLink>
          </div>
        </div>

        {/* Account */}
        <div>
          <h3 className="font-semibold text-white">
            Account
          </h3>

          <div className="mt-5 flex flex-col gap-3 text-sm">
            <NavLink
              to="/login"
              className="transition hover:text-blue-500"
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className="transition hover:text-blue-500"
            >
              Register
            </NavLink>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-white">
            Contact Us
          </h3>

          <div className="mt-5 space-y-3 text-sm text-gray-400">
            <p>support@medicare.com</p>
            <p>+92 300 1234567</p>
            <p>Mon - Sat: 9:00 AM - 6:00 PM</p>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-center text-xs text-gray-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8 md:text-left">

          <p>
            © 2026 MediCare. All rights reserved.
          </p>

          <p>
            Your health, our priority.
          </p>

        </div>
      </div>

    </footer>
  );
}
