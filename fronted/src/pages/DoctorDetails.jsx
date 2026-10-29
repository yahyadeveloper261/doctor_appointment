import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaMapMarkerAlt,
  FaUserMd,
  FaGraduationCap,
  FaBriefcase,
} from "react-icons/fa";

import { getDoctorById } from "../services/doctorApi";
import { useEffect, useState } from "react";

export default function DoctorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const doctorDetail = async () => {
      try {
        setLoading(true);
        setMessage("");

        const data = await getDoctorById(id);

        setDoctors(data.doctor ? [data.doctor] : []);
      } catch (error) {
        setMessage(error.message || "Failed to load doctor detail");
      } finally {
        setLoading(false);
      }
    };

    doctorDetail();
  }, [id]);

  const doctor = doctors[0];

  const handleBookAppointment = (doctorId) => {
    navigate(`/appointment?doctor=${doctorId}`);
  };

  // Iske neeche tumhara existing loading,
  // Doctor Not Found aur profile JSX rahega.

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-3">
        <div className="h-6 w-6 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        <p className="text-gray-600">Loading doctor details...</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          {message ? (
            <p className="text-red-600">{message}</p>
          ) : (
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Doctor Not Found
            </h1>
          )}

          <Link
            to="/doctors"
            className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
          >
            Back to Doctors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/doctors"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
        >
          ← Back to Doctors
        </Link>

        {/* Doctor Profile */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-md dark:bg-gray-900">
          <div className="grid md:grid-cols-3">
            {/* Image */}
            <div className="h-80 bg-gray-100 dark:bg-gray-800 md:h-auto">
              <img
                src={doctor?.image || "No image"}
                alt={doctor.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Basic Info */}
            <div className="p-6 md:col-span-2 md:p-8">
              <p className="flex items-center gap-2 text-sm font-medium text-blue-600">
                <FaUserMd />
                {doctor.specialty}
              </p>

              <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {doctor.name}
              </h1>

              {/* Rating */}
              <div className="mt-4 flex items-center gap-2">
                <FaStar className="text-yellow-500" />

                <span className="font-semibold text-gray-900 dark:text-white">
                  {doctor.rating}
                </span>

                <span className="text-gray-500">Rating</span>
              </div>

              {/* Details */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <FaBriefcase className="text-blue-600" />

                  <span>
                    <strong>Experience:</strong> {doctor.experience} years
                  </span>
                </div>

                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <FaMapMarkerAlt className="text-red-500" />

                  <span>
                    <strong>Location:</strong> {doctor.city}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <FaGraduationCap className="text-blue-600" />

                  <span>
                    <strong>Qualification:</strong> MBBS, FCPS
                  </span>
                </div>
              </div>

              {/* Fee */}
              <div className="mt-7 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Consultation Fee
                </p>

                <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                  Rs. {doctor.fee}
                </p>
              </div>
              <button
                onClick={() => handleBookAppointment(doctor._id)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-md dark:bg-gray-900 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            About Doctor
          </h2>

          <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
            {doctor.name} is an experienced {doctor.specialty.toLowerCase()}{" "}
            with {doctor.experience} years of professional experience. The
            doctor provides quality consultation and personalized care to
            patients.
          </p>
        </div>
      </div>
    </div>
  );
}
