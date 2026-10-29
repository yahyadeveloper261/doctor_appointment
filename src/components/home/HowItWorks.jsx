import React from "react";
import {
  FaMagnifyingGlass,
  FaCalendarCheck,
  FaUserDoctor,
} from "react-icons/fa6";

const steps = [
  {
    number: "01",
    icon: <FaMagnifyingGlass />,
    title: "Find a Doctor",
    description:
      "Search for the right doctor based on specialty and your healthcare needs.",
  },
  {
    number: "02",
    icon: <FaCalendarCheck />,
    title: "Book Appointment",
    description:
      "Choose your preferred doctor, date, and time to book an appointment.",
  },
  {
    number: "03",
    icon: <FaUserDoctor />,
    title: "Meet Your Doctor",
    description:
      "Visit your doctor at the scheduled time and get the care you need.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 px-5 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-blue-600">
            HOW IT WORKS
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Book Your Appointment Easily
          </h2>

          <p className="mt-4 text-gray-500">
            Find a trusted doctor and book your appointment
            in just a few simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl border border-gray-100 bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >

              {/* Number */}
              <span className="absolute right-5 top-5 text-sm font-bold text-gray-200">
                {step.number}
              </span>

              {/* Icon */}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="mt-6 text-lg font-bold text-gray-900">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-6 text-gray-500">
                {step.description}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
