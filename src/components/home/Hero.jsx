import React from "react";
import { NavLink } from "react-router-dom";
import { FaArrowRight, FaCalendarCheck } from "react-icons/fa6";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white">
      <div className="mx-auto grid min-h-[600px] max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">

        {/* Left Content */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
            <FaCalendarCheck />
            Trusted Healthcare Platform
          </span>

          <h1 className="mt-6 max-w-xl text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Find the Right Doctor
            <span className="block text-blue-600">
              For Your Health
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
            Find trusted doctors, book appointments, and manage your
            healthcare journey with ease.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <NavLink
              to="/doctors"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
            >
              Find a Doctor
              <FaArrowRight size={14} />
            </NavLink>

            <NavLink
              to="/appointment"
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3.5 font-semibold text-gray-700 transition hover:border-blue-200 hover:text-blue-600"
            >
              Book Appointment
            </NavLink>

          </div>

          {/* Trust Stats */}
          <div className="mt-10 flex flex-wrap gap-8 border-t border-gray-200 pt-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">500+</h3>
              <p className="text-sm text-gray-500">Doctors</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900">10k+</h3>
              <p className="text-sm text-gray-500">Patients</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900">4.9/5</h3>
              <p className="text-sm text-gray-500">Rating</p>
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative hidden lg:block">

          <div className="mx-auto flex h-[480px] w-full max-w-md items-center justify-center rounded-[40px] bg-blue-100">

            <div className="text-center">
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl">
                <FaCalendarCheck size={55} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-800">
                Your Health, Our Priority
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Book your appointment today
              </p>
            </div>

          </div>

          {/* Floating Card */}
          <div className="absolute -bottom-5 -left-5 rounded-2xl bg-white p-4 shadow-xl">
            <p className="text-xs text-gray-500">
              Available Doctors
            </p>
            <p className="mt-1 text-xl font-bold text-blue-600">
              500+
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
