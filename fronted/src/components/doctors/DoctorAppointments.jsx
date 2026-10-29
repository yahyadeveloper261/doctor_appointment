import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { updatedoctorAppointments } from "../../services/appointmentApi";
import DoctorSidebar from "./DoctorSidebar";
import { getdoctorAppointments } from "../../services/appointmentApi";
import {
  FaCalendarCheck,
  FaUsers,
  FaClock,
  FaRegCalendarAlt,
  FaStethoscope,
} from "react-icons/fa";

export default function DoctorAppointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("default");
  const tableRef = useRef(null);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const appointment = await getdoctorAppointments(search, page, 10, sort);
        setTotalPages(appointment.totalPages);
        setAppointments(appointment.appointments);
      } catch (error) {
        console.log("Appointments cannot load successfully", error);
      } finally {
        setLoading(false);
      }
    };

    getAppointments();
  }, [search, page, sort]);

  const statusStyle = {
    pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    confirmed: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    cancelled: "bg-red-50 text-red-700 ring-1 ring-red-200",
    completed: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  };

  const counts = {
    total: appointments?.length,
    pending: appointments?.filter((item) => item?.status === "pending").length,
    cancelled: appointments?.filter((item) => item?.status === "cancelled")
      .length,
    confirmed: appointments?.filter((item) => item?.status === "confirmed")
      .length,
    completed: appointments?.filter((item) => item?.status === "completed")
      .length,
  };

  const [searchParams] = useSearchParams();

  const selectedFilter = searchParams.get("filter") || "all";

  const filteredAppointments =
    selectedFilter === "all"
      ? appointments
      : appointments?.filter((item) => item?.status === selectedFilter);

  useEffect(() => {
    tableRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [selectedFilter]);

  const [updatingId, setUpdatingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleStatusChange = async (id, status) => {
    try {
      setUpdatingId(id);
      setErrorMessage("");

      await updatedoctorAppointments(id, status);

      setAppointments((prev) =>
        prev?.map((item) => (item._id === id ? { ...item, status } : item)),
      );
    } catch (error) {
      setErrorMessage(error.message || "Status update failed");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <DoctorSidebar />

      <main className="min-h-screen p-5 pt-24 sm:p-8 sm:pt-24 sm:pl-24">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
              Doctor Workspace
            </p>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
              My Appointments<span className="text-teal-600">.</span>
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              View your bookings and keep track of patient visits.
            </p>
          </div>

          <div className="flex w-fit items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-xl text-teal-700">
              <FaCalendarCheck />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Appointments</p>
              <p className="text-xs text-slate-500">Patient bookings</p>
            </div>
          </div>
        </div>

        {/* Welcome Banner */}
        <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-teal-800 via-teal-700 to-cyan-700 p-6 text-white shadow-xl shadow-teal-900/10 sm:p-8">
          <div className="pointer-events-none absolute -right-8 -top-16 h-52 w-52 rounded-full border-[32px] border-white/10" />

          <div className="relative z-10 flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-2xl">
              <FaStethoscope />
            </div>

            <div>
              <h2 className="text-xl font-bold sm:text-2xl">
                Your Patient Schedule
              </h2>
              <p className="mt-1 text-sm text-teal-50">
                Manage your bookings and review appointment details.
              </p>
            </div>
          </div>
        </section>

        {/* Premium Summary Cards */}
        <section className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
          {/* Total Appointments */}
          <div
            onClick={() => navigate("/doctor/appointments?filter=all")}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-900/5"
          >
            <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-teal-50/80 transition-transform duration-300 group-hover:scale-110" />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Appointments
                </p>
                <p className="mt-4 text-3xl font-extrabold tracking-tight text-slate-800">
                  {loading ? "—" : counts.total || 0}
                </p>
                <p className="mt-1 text-xs text-slate-400">All bookings</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-100 text-xl text-teal-700 shadow-sm">
                <FaCalendarCheck />
              </div>
            </div>
            <div className="mt-5 h-1 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-400" />
            </div>
          </div>

          {/* Pending */}
          <div
            onClick={() => navigate("/doctor/appointments?filter=pending")}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-900/5"
          >
            <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-amber-50/80 transition-transform duration-300 group-hover:scale-110" />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Pending</p>
                <p className="mt-4 text-3xl font-extrabold tracking-tight text-slate-800">
                  {loading ? "—" : counts.pending || 0}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Awaiting confirmation
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-xl text-amber-700 shadow-sm">
                <FaClock />
              </div>
            </div>
            <div className="mt-5 h-1 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-amber-400"
                style={{
                  width: counts?.total
                    ? `${(counts.pending / counts.total) * 100}%`
                    : "0%",
                }}
              />
            </div>
          </div>

          {/* Confirmed */}
          <div
            onClick={() => navigate("/doctor/appointments?filter=confirmed")}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5"
          >
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Confirmed</p>
                <p className="mt-4 text-3xl font-extrabold tracking-tight text-slate-800">
                  {loading ? "—" : counts.confirmed || 0}
                </p>
                <p className="mt-1 text-xs text-slate-400">Approved bookings</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-xl text-emerald-700 shadow-sm">
                <FaUsers />
              </div>
            </div>
            <div className="mt-5 h-1 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{
                  width: counts.total
                    ? `${(counts.confirmed / counts.total) * 100}%`
                    : "0%",
                }}
              />
            </div>
          </div>

          {/* Completed */}
          <div
            onClick={() => navigate("/doctor/appointments?filter=completed")}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5"
          >
            <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-blue-50/80 transition-transform duration-300 group-hover:scale-110" />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Completed</p>
                <p className="mt-4 text-3xl font-extrabold tracking-tight text-slate-800">
                  {loading ? "—" : counts?.completed || 0}
                </p>
                <p className="mt-1 text-xs text-slate-400">Finished visits</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-xl text-blue-700 shadow-sm">
                <FaRegCalendarAlt />
              </div>
            </div>
            <div className="mt-5 h-1 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-500"
                style={{
                  width: counts?.total
                    ? `${(counts?.completed / counts?.total) * 100}%`
                    : "0%",
                }}
              />
            </div>
          </div>

          {/* Cancelled */}
          <div
            onClick={() => navigate("/doctor/appointments?filter=cancelled")}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl hover:shadow-red-900/5"
          >
            <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-red-50/80 transition-transform duration-300 group-hover:scale-110" />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Cancelled</p>
                <p className="mt-4 text-3xl font-extrabold tracking-tight text-slate-800">
                  {loading ? "—" : counts?.cancelled || 0}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Cancelled bookings
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-xl text-red-700 shadow-sm">
                <FaRegCalendarAlt />
              </div>
            </div>
            <div className="mt-5 h-1 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-red-500"
                style={{
                  width: counts?.total
                    ? `${(counts?.cancelled / counts?.total) * 100}%`
                    : "0%",
                }}
              />
            </div>
          </div>
        </section>

        <div className="relative w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search appointments..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 mb-3 text-sm text-slate-700 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          className="w-full sm:w-52 rounded-xl border border-gray-200
  bg-white px-4 py-3 mb-3 text-sm font-medium text-gray-700
  shadow-sm outline-none transition
  hover:border-blue-400
  focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="default">Sort by Date</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
        {/* Appointments Table */}
        <section
          ref={tableRef}
          className="scroll-mt-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
        >
          <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Recent Appointments
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Patient details and booking status
              </p>
            </div>

            <span className="w-fit rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700">
              {loading
                ? "Loading..."
                : `${filteredAppointments?.length || 0} bookings`}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead>
                <tr className="bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4 font-semibold">Patient</th>
                  <th className="px-6 py-4 font-semibold">Date & Time</th>
                  <th className="px-6 py-4 font-semibold">Reason</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-14 text-center text-sm text-slate-500"
                    >
                      Loading appointments...
                    </td>
                  </tr>
                ) : filteredAppointments?.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-14 text-center text-sm text-slate-500"
                    >
                      No appointments found for this status.
                    </td>
                  </tr>
                ) : (
                  filteredAppointments?.map((item) => (
                    <tr
                      key={item?._id}
                      className="transition-colors hover:bg-teal-50/30"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 font-bold text-teal-800">
                            {(item?.patient?.name || "Unknown")
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">
                              {item?.patient?.name || "Patient"}
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                              Patient booking
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-700">
                          {item?.date || "—"}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {item?.time || "—"}
                        </p>
                      </td>

                      <td className="max-w-xs px-6 py-4 text-sm text-slate-600">
                        {item?.reason || "Not specified"}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col items-start gap-3">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
                              statusStyle[item?.status] ||
                              "bg-slate-100 text-slate-600"
                            }`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {item?.status || "Unknown"}
                          </span>

                          {item?.status === "pending" && (
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                disabled={updatingId === item._id}
                                onClick={() =>
                                  handleStatusChange(item._id, "confirmed")
                                }
                                className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {updatingId === item._id
                                  ? "Updating..."
                                  : "✓ Confirm"}
                              </button>

                              <button
                                type="button"
                                disabled={updatingId === item._id}
                                onClick={() =>
                                  handleStatusChange(item._id, "cancelled")
                                }
                                className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                Cancel
                              </button>
                            </div>
                          )}

                          {item?.status === "confirmed" && (
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                disabled={updatingId === item._id}
                                onClick={() =>
                                  handleStatusChange(item._id, "completed")
                                }
                                className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {updatingId === item._id
                                  ? "Updating..."
                                  : "✓ Complete"}
                              </button>

                              <button
                                type="button"
                                disabled={updatingId === item._id}
                                onClick={() =>
                                  handleStatusChange(item._id, "cancelled")
                                }
                                className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                Cancel
                              </button>
                            </div>
                          )}

                          {errorMessage && updatingId === null && (
                            <p className="text-xs text-red-600">
                              {errorMessage}
                            </p>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-4 sm:px-6">
            <p className="text-xs text-slate-500">
              Appointment information is loaded from your account.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 bg-white px-5 py-4 sm:px-6">
            <p className="text-sm text-slate-500">
              Page <span className="font-bold text-slate-800">{page}</span> of{" "}
              <span className="font-bold text-slate-800">{totalPages}</span>
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((prev) => prev - 1)}
                disabled={page <= 1}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Previous
              </button>

              <span className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-teal-700 px-3 text-sm font-bold text-white">
                {page}
              </span>

              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={page >= totalPages}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
