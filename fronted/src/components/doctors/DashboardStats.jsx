import { useEffect, useState } from "react";
import { getdoctorAppointments } from "../../services/appointmentApi";
import {
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
  FaRegCalendarAlt,
  FaTimesCircle,
  FaChartBar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function DashboardStats() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  let page;
  const navigate = useNavigate();
  useEffect(() => {
    const getAppointments = async () => {
      try {
        const result = await getdoctorAppointments(search, (page = 1), 10);
        setAppointments(result.appointments);
      } catch (error) {
        console.log("Appointments failed to load:", error);
      } finally {
        setLoading(false);
      }
    };

    getAppointments();
  }, [search]);

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

  const cards = [
    {
      title: "Total Appointments",
      value: counts?.total,
      subtitle: "All patient bookings",
      icon: FaCalendarCheck,
      color: "teal",
      iconBg: "bg-teal-100 text-teal-700",
      border: "border-teal-100 hover:border-teal-300",
      glow: "bg-teal-100/70",
      bar: "bg-teal-600",
    },
    {
      title: "Pending",
      value: counts?.pending,
      subtitle: "Awaiting confirmation",
      icon: FaClock,
      color: "amber",
      iconBg: "bg-amber-100 text-amber-700",
      border: "border-amber-100 hover:border-amber-300",
      glow: "bg-amber-100/70",
      bar: "bg-amber-500",
    },
    {
      title: "Confirmed",
      value: counts?.confirmed,
      subtitle: "Approved appointments",
      icon: FaCheckCircle,
      color: "emerald",
      iconBg: "bg-emerald-100 text-emerald-700",
      border: "border-emerald-100 hover:border-emerald-300",
      glow: "bg-emerald-100/70",
      bar: "bg-emerald-600",
    },
    {
      title: "Completed",
      value: counts?.completed,
      subtitle: "Successfully completed",
      icon: FaRegCalendarAlt,
      color: "blue",
      iconBg: "bg-blue-100 text-blue-700",
      border: "border-blue-100 hover:border-blue-300",
      glow: "bg-blue-100/70",
      bar: "bg-blue-600",
    },
    {
      title: "Cancelled",
      value: counts?.cancelled,
      subtitle: "Cancelled bookings",
      icon: FaTimesCircle,
      color: "red",
      iconBg: "bg-red-100 text-red-700",
      border: "border-red-100 hover:border-red-300",
      glow: "bg-red-100/70",
      bar: "bg-red-600",
    },
  ];

  return (
    <section className="mt-8">
      {/* Section Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-teal-500" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
              Practice Analytics
            </p>
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight text-slate-800 sm:text-3xl">
            Appointment Overview
            <span className="text-teal-600">.</span>
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Quick summary of your patient appointments.
          </p>
        </div>

        <div className="flex w-fit items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-lg text-teal-700">
            <FaChartBar />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">
              Appointment Stats
            </p>
            <p className="text-xs text-slate-500">
              {loading ? "Updating data..." : "Overview updated"}
            </p>
          </div>
        </div>
      </div>

      {/* Five Premium Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {cards.map((card) => {
          const Icon = card.icon;
          const percentage =
            counts.total > 0 && card.color !== "teal"
              ? Math.round((card.value / counts.total) * 100)
              : 100;

          return (
            <div
              key={card.title}
              onClick={() =>
                navigate(
                  `/doctor/appointments?filter=${
                    card.title === "Total Appointments"
                      ? "all"
                      : card.title.toLowerCase()
                  }`,
                )
              }
              className={`group relative cursor-pointer overflow-hidden rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${card.border}`}
            >
              {/* Decorative background */}
              <div
                className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full ${card.glow} opacity-60 transition-transform duration-500 group-hover:scale-125`}
              />

              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      {card.title}
                    </p>

                    <p className="mt-5 text-4xl font-extrabold tracking-tight text-slate-800">
                      {loading ? "—" : card?.value || 0}
                    </p>
                  </div>

                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl shadow-sm transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110 ${card.iconBg}`}
                  >
                    <Icon />
                  </div>
                </div>

                <p className="mt-3 min-h-5 text-xs font-medium text-slate-500">
                  {card.subtitle}
                </p>

                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Appointments</span>
                    <span className="font-bold text-slate-600">
                      {loading ? "—" : `${percentage}%`}
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${card.bar}`}
                      style={{
                        width: loading ? "0%" : `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
