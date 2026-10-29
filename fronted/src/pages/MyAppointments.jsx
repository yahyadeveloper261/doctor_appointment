import { useEffect, useState } from "react";
import AppointmentCard from "../components/appointments/AppointmentCard";
import { myAppointments } from "../services/appointmentApi";
import { cancelAppointment } from "../services/appointmentApi";
export default function MyAppointments() {
  const [counts, setCounts] = useState({
    all: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  });
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const filters = ["all", "pending", "confirmed", "completed", "cancelled"];

  useEffect(() => {
    const loadAppointments = async () => {
      setLoading(true);
      try {
        const data = await myAppointments(search, page, 8, filter);
        setAppointments(data.appointments || []);
        setTotalPages(data.totalPages || 1);
        setCounts(data.counts || {});
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [search, page, filter]);

  const filteredAppointments = appointments;
  const getCount = (status) => {
    return counts[status] ?? 0;
  };

  const handleCancel = async (id) => {
    try {
      await cancelAppointment(id);

      const data = await myAppointments(search, 1, 8, filter);

      setPage(1);
      setAppointments(data.appointments || []);
      setTotalPages(data.totalPages || 1);
      setCounts(data.counts || {});
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          My Appointments
        </h1>
        <input
          type="text"
          placeholder="Search doctor by name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border p-2 rounded w-full mb-2"
        />
        <p className=" text-gray-500">Manage and track your appointments.</p>

        {/* Filter Buttons */}
        <div className="my-7 flex flex-wrap gap-3">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => {
                setFilter(item);
                setPage(1);
              }}
              className={`rounded-xl px-5 py-2 font-semibold capitalize transition ${
                filter === item
                  ? "bg-blue-600 text-white shadow"
                  : "border border-gray-200 bg-white text-gray-600 hover:bg-blue-50"
              }`}
            >
              {item === "all" ? "All" : item}
              {" ("}
              {getCount(item)}
              {")"}
            </button>
          ))}
        </div>

        {/* Appointment Cards */}
        {loading ? (
          <p className="py-10 text-center text-gray-500">
            Loading appointments...
          </p>
        ) : filteredAppointments.length === 0 ? (
          <div className="rounded-2xl border border-dashed bg-white p-10 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              No {filter === "all" ? "" : filter} appointments found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Your appointments will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((item) => (
              <AppointmentCard
                key={item._id}
                appointment={item}
                handleCancel={handleCancel}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1 || loading}
            className="rounded-lg border px-4 py-2 text-sm font-medium
    hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ← Prev
          </button>

          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={page >= totalPages || loading}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm
    font-medium text-white hover:bg-blue-700
    disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
