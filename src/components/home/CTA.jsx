import React from "react";
import { NavLink } from "react-router-dom";
import { FaArrowRight, FaCalendarCheck } from "react-icons/fa6";

export default function CTA() {
  return (
    <section className="px-5 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        <div className="relative overflow-hidden rounded-3xl bg-blue-600 px-6 py-14 text-center shadow-xl sm:px-12 lg:px-20">

          {/* Background Decoration */}
          <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-blue-500 opacity-50" />
          <div className="absolute -bottom-24 -right-20 h-56 w-56 rounded-full bg-blue-700 opacity-50" />

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-2xl">

            {/* Icon */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white">
              <FaCalendarCheck size={25} />
            </div>

            {/* Heading */}
            <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
              Ready to Take Care of Your Health?
            </h2>

            {/* Description */}
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
              Find a trusted doctor and book your appointment
              quickly and easily. Your health deserves the best care.
            </p>

            {/* Button */}
            <NavLink
              to="/appointment"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-blue-600 shadow-md transition hover:bg-blue-50"
            >
              Book Appointment
              <FaArrowRight size={14} />
            </NavLink>

          </div>
        </div>

      </div>
    </section>
  );
}
