import React from "react";
import DoctorSidebar from "../components/doctors/DoctorSidebar";
import DashboardStats from "../components/doctors/DashboardStats";
import {
  FaRegCalendarCheck,
  FaUserMd,
  FaArrowRight,
  FaRegClock,
} from "react-icons/fa";

export default function DoctorDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <DoctorSidebar />

      <main className="min-h-screen p-5 pt-24 sm:p-8 sm:pt-24 sm:pl-24">
        {/* Top Heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-teal-700">
              Doctor Workspace
            </p>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
              Dashboard<span className="text-teal-600">.</span>
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Manage your practice and patient appointments.
            </p>
          </div>

          <div className="flex w-fit items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-xl text-teal-700">
              <FaUserMd />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-800">Doctor Portal</p>
              <p className="mt-1 text-xs text-slate-500">Your workspace</p>
            </div>
          </div>
        </div>

        {/* Welcome Banner */}
        <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-teal-800 via-teal-700 to-cyan-700 p-6 text-white shadow-xl shadow-teal-900/10 sm:p-9">
          <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full border-[35px] border-white/10" />
          <div className="pointer-events-none absolute -bottom-24 right-32 h-48 w-48 rounded-full bg-cyan-300/10 blur-2xl" />

          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-teal-50">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              Your practice at a glance
            </span>

            <h2 className="mt-5 text-2xl font-bold leading-tight sm:text-3xl">
              Welcome back, Doctor!
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-teal-50 sm:text-base">
              Stay organized, review your appointments, and keep your patient
              care running smoothly from one place.
            </p>

            <a
              href="/doctor/appointments"
              className="mt-6 inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-sm font-bold text-teal-800 shadow-md transition hover:-translate-y-0.5 hover:bg-teal-50"
            >
              View Appointments
              <FaArrowRight />
            </a>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-8">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-800">
              Practice Overview
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              A quick overview of your activity.
            </p>
          </div>

          <DashboardStats />
        </section>

        {/* Quick Information Cards */}
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <a
            href="/doctor/appointments"
            className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-xl text-teal-700 transition group-hover:bg-teal-700 group-hover:text-white">
              <FaRegCalendarCheck />
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-slate-800">My Appointments</h3>

              <p className="mt-1 text-sm text-slate-500">
                Review and manage patient bookings.
              </p>
            </div>

            <FaArrowRight className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-teal-700" />
          </a>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-xl text-violet-700">
              <FaRegClock />
            </div>

            <div>
              <h3 className="font-bold text-slate-800">Stay Organized</h3>
              <p className="mt-1 text-sm text-slate-500">
                Keep track of your bookings and patient care.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
