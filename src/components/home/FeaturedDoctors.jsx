import React from "react";
import { NavLink } from "react-router-dom";
import { FaStar, FaArrowRight } from "react-icons/fa6";

const doctors = [
  {
    id: 1,
    name: "Dr. Ahmed Khan",
    specialty: "Cardiologist",
    experience: "8 Years Experience",
    rating: "4.9",
    image: "https://i.pravatar.cc/300?img=12",
  },
  {
    id: 2,
    name: "Dr. Sarah Ali",
    specialty: "Dermatologist",
    experience: "6 Years Experience",
    rating: "4.8",
    image: "https://i.pravatar.cc/300?img=47",
  },
  {
    id: 3,
    name: "Dr. Usman Malik",
    specialty: "Neurologist",
    experience: "10 Years Experience",
    rating: "4.9",
    image: "https://i.pravatar.cc/300?img=11",
  },
];

export default function FeaturedDoctors() {
  return (
    <section className="bg-white px-5 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              OUR DOCTORS
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Meet Our Top Doctors
            </h2>

            <p className="mt-3 max-w-xl text-gray-500">
              Connect with experienced and trusted doctors
              for your healthcare needs.
            </p>
          </div>

          <NavLink
            to="/doctors"
            className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View All Doctors
            <FaArrowRight size={13} />
          </NavLink>
        </div>

        {/* Doctors */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="h-64 overflow-hidden bg-blue-50">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5">

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {doctor.name}
                    </h3>

                    <p className="mt-1 text-sm text-blue-600">
                      {doctor.specialty}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 rounded-lg bg-yellow-50 px-2 py-1 text-sm font-semibold text-yellow-600">
                    <FaStar size={12} />
                    {doctor.rating}
                  </div>
                </div>

                <p className="mt-3 text-sm text-gray-500">
                  {doctor.experience}
                </p>

                <NavLink
                  to="/doctorsDetails"
                  className="mt-5 block rounded-xl border border-blue-600 py-2.5 text-center text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                >
                  View Profile
                </NavLink>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
