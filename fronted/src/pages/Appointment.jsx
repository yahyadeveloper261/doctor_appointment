import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getDoctorById } from "../services/doctorApi";
import BookingForm from "../components/appointments/BookingForm";

export default function Appointment() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const doctorId = searchParams.get("doctor");

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        setLoading(true);

        const data = await getDoctorById(doctorId);

        setSelectedDoctor(data.doctor || null);
      } catch (error) {
        console.log(error.message);
        setSelectedDoctor(null);
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) {
      loadDoctor();
    } else {
      setSelectedDoctor(null);
      setLoading(false);
    }
  }, [doctorId]);

  if (loading) {
    return <p className="p-8 text-center">Loading doctor...</p>;
  }

  if (!doctorId || !selectedDoctor) {
    return (
      <div className="p-10 text-center">
        <p className="mb-4 text-gray-600">Please select a doctor first.</p>
        <Link
          to="/doctors"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          Find Doctors
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          Book Appointment
        </h1>

        {/* Selected Doctor */}
        <div className="mb-6 flex items-center gap-4 rounded-2xl border bg-white p-5 shadow-sm">
          <img
            src={selectedDoctor.image || "/doctor-placeholder.png"}
            alt={selectedDoctor.name || "Doctor"}
            className="h-20 w-20 rounded-xl object-cover"
          />

          <div>
            <h2 className="font-bold text-gray-900">{selectedDoctor.name}</h2>
            <p className="text-sm text-blue-600">{selectedDoctor.specialty}</p>
            <p className="text-sm text-gray-500">{selectedDoctor.city}</p>
            <p className="mt-1 font-semibold">
              Fee: Rs. {selectedDoctor.fee ?? "N/A"}
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <BookingForm selectedDoctor={selectedDoctor} />
      </div>
    </div>
  );
}
