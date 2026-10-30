import React, { useEffect, useState } from "react";
import { Link,useSearchParams} from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaUserMd } from "react-icons/fa";

import { getDoctors } from "../services/doctorApi";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams] = useSearchParams();
const specialty = searchParams.get("specialty") || "";
  const limit=8
  useEffect(() => {
    setLoading(true);
    const loadDoctors = async () => {
      try {
      const data = await getDoctors(search, page, limit, specialty);
        setDoctors(data.doctors);
        setTotalPages(data.totalPages);
      } catch (error) {
        setMessage(error.message || "failed to laod doctors");
      } finally {
        setLoading(false);
      }
    };
    loadDoctors();
  }, [search, page,specialty]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-4 dark:bg-gray-950">
      {/* Search Doctor */}
      <div className="mx-auto mb-4 max-w-xl">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search doctor by name..."
            className="w-full rounded-xl border border-gray-300
      bg-white py-3 pl-11 pr-4 text-sm text-gray-900
      shadow-sm outline-none transition
      placeholder:text-gray-400
      focus:border-blue-500 focus:ring-2 focus:ring-blue-100
      dark:border-gray-700 dark:bg-gray-900
      dark:text-white dark:focus:ring-blue-900"
          />

          <svg
            className="absolute left-4 top-1/2 h-5 w-5
      -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" strokeWidth="2" />
            <path d="m16 16 4 4" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      {/* Header */}
      <div className="mx-auto mb-6 max-w-7xl text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          Find the Right Doctor
        </h1>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Browse trusted doctors and book your appointment easily
        </p>
      </div>
      {/* Error Message */}{" "}
      {message && (
        <p
          className="mx-auto mb-6 max-w-7xl rounded-lg bg-red-100 px-4 py-3
         text-center text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300"
        >
          {" "}
          {message}{" "}
        </p>
      )}
      {loading && (
        <div className="flex items-center justify-center gap-3 py-10">
          <div className="h-6 w-6 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

          <p className="text-gray-600 font-medium">Loading doctors...</p>
        </div>
      )}
      {/* Doctors Grid */}
   <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 min-[700px]:grid-cols-4">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
          >
            {/* Doctor Image */}
      <div className="relative flex h-50 items-center justify-center bg-gray-100 dark:bg-gray-800">
             <img
  src={doctor.image}
  alt={doctor.name}
  className="w-full h-48 object-cover object-top"
/>
            </div>

            {/* Doctor Info */}
            <div className="p-3">
              {/* Name */}
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {doctor.name}
              </h2>

              {/* Specialty */}
              <div className="mt-1 flex items-center gap-2 text-sm text-blue-600">
                <FaUserMd />
                <span>{doctor.specialty}</span>
              </div>

              {/* Rating */}
              <div className="mt-1 flex items-center gap-2">
                <div className="flex items-center gap-1 text-yellow-500">
                  <FaStar />
                  <span className="font-semibold">{doctor.rating}</span>
                </div>

                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Rating
                </span>
              </div>

              {/* Experience */}
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  Experience:
                </span>{" "}
                {doctor.experience} years
              </p>

              {/* City */}
              <div className="mt-1 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <FaMapMarkerAlt className="text-red-500" />
                <span>{doctor.city}</span>
              </div>

              {/* Fee */}
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Consultation Fee
                  </p>

                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    Rs. {doctor.fee}
                  </p>
                </div>

                <Link
                  to={`/doctor/${doctor._id}`}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        ))}

        </div>
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-teal-600 hover:bg-teal-50 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-700"
          >
            ← Prev
          </button>

          <span className="rounded-xl bg-teal-50 px-4 py-2.5 text-sm font-semibold text-teal-800 ring-1 ring-teal-100">
            {page} <span className="mx-1 text-teal-400">/</span> {totalPages}
          </span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === totalPages}
            className="rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-teal-700"
          >
            Next →
          </button>
      </div>

    </div>
  );
}
