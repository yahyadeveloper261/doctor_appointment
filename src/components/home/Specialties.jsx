import React from "react";
import {
  FaHeartPulse,
  FaBrain,
  FaTooth,
  FaEye,
  FaBaby,
  FaUserDoctor,
} from "react-icons/fa6";

const specialties = [
  {
    name: "Cardiology",
    icon: <FaHeartPulse />,
  },
  {
    name: "Neurology",
    icon: <FaBrain />,
  },
  {
    name: "Dentistry",
    icon: <FaTooth />,
  },
  {
    name: "Ophthalmology",
    icon: <FaEye />,
  },
  {
    name: "Pediatrics",
    icon: <FaBaby />,
  },
  {
    name: "General Medicine",
    icon: <FaUserDoctor />,
  },
];

export default function Specialties() {
  return (
    <section className="bg-gray-50 px-5 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold text-blue-600">
            EXPLORE SPECIALTIES
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Find Care for Every Need
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Choose from a wide range of medical specialties and find
            the right doctor for your needs.
          </p>
        </div>

        {/* Specialty Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {specialties.map((specialty) => (
            <div
              key={specialty.name}
              className="group flex cursor-pointer flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                {specialty.icon}
              </div>

              <h3 className="mt-4 text-sm font-semibold text-gray-800">
                {specialty.name}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

