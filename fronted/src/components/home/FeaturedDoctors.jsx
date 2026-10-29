import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaStar, FaArrowRight, FaMagnifyingGlass } from "react-icons/fa6";
import { FaMapMarkerAlt, FaUserMd } from "react-icons/fa";

import { getDoctors } from "../../services/doctorApi.js";

export default function FeaturedDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const[page,setPage]=useState(1);
  const limit=4
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoading(true);

        const data = await getDoctors(search,page,limit);
        setDoctors(data.doctors);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    loadDoctors();
  }, [search]);

  return (
    <div>
      <section className="bg-white px-5 pt-5">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-md transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
            <FaMagnifyingGlass className="text-gray-400" size={20} />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search doctor by name or specialty..."
              className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 sm:text-base"
            />

            <button
              type="button"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-3 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Heading */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold text-blue-600">OUR DOCTORS</p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                Meet Our Top Doctors
              </h2>

              <p className="mt-3 max-w-xl text-gray-500">
                Connect with experienced and trusted doctors for your healthcare
                needs.
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
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {loading && (
              <div className="flex items-center justify-center gap-3 py-10">
                <div className="h-6 w-6 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

                <p className="text-gray-600 font-medium">Loading doctors...</p>
              </div>
            )}
       
       {doctors.length === 0 && (
  <div className="col-span-full rounded-xl border border-blue-200 bg-blue-50 px-6 py-10 text-center dark:border-blue-900 dark:bg-blue-950">
    <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
      No Doctors Found
    </p>
    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
      No doctors are available right now. Please try again later.
    </p>
  </div>
)}

            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
              >
                {/* Doctor Image */}
                <div className="relative flex h-40 items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <img
                    src={doctor?.image || "No Image "}
                    alt={doctor.name}
                    className="h-full w-full object-cover"
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
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <FaStar />
                      <span className="font-semibold">{doctor.rating}</span>
                    </div>

                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Rating
                    </span>
                  </div>

                  {/* Experience */}
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
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
        </div>
      </section>
    </div>
  );
}
