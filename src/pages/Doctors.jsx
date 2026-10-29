
import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaUserMd } from "react-icons/fa";

import doctors from "../data/doctors";

export default function Doctors() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-950">
      
      {/* Header */}
      <div className="mx-auto mb-10 max-w-7xl text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          Find the Right Doctor
        </h1>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Browse trusted doctors and book your appointment easily
        </p>
      </div>

      {/* Doctors Grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
          >
            
            {/* Doctor Image */}
            <div className="relative flex h-56 items-center justify-center bg-gray-100 dark:bg-gray-800">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Doctor Info */}
            <div className="p-5">

              {/* Name */}
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {doctor.name}
              </h2>

              {/* Specialty */}
              <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
                <FaUserMd />
                <span>{doctor.specialty}</span>
              </div>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-1 text-yellow-500">
                  <FaStar />
                  <span className="font-semibold">{doctor.rating}</span>
                </div>

                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Rating
                </span>
              </div>

              {/* Experience */}
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  Experience:
                </span>{" "}
                {doctor.experience} years
              </p>

              {/* City */}
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <FaMapMarkerAlt className="text-red-500" />
                <span>{doctor.city}</span>
              </div>

              {/* Fee */}
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Consultation Fee
                  </p>

                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    Rs. {doctor.fee}
                  </p>
                </div>

                <Link
                  to={`/doctor/${doctor.id}`}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  View Doctor
                </Link>
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
