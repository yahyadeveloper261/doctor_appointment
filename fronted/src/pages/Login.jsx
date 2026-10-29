import React, { useState } from "react";
import { loginUser } from "../services/Login";
import { loginDoctor } from "../services/doctorApi";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaUserMd,
  FaArrowRight,
  FaHeartbeat,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("patient");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (role === "patient") {
        const result = await loginUser({ email, password });
        localStorage.setItem("token", result.token);
        localStorage.setItem("role", "patient");
        navigate("/doctors", { replace: true });
      } else {
        const result = await loginDoctor({ email, password });
      localStorage.setItem("doctorToken", result.token);
        localStorage.setItem("role", "doctor");
        navigate("/doctor/dashboard", { replace: true });
      }
    } catch (error) {
      setMessage(error.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-10 sm:px-6">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-teal-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white bg-white shadow-2xl shadow-slate-200/70 lg:grid-cols-2">
        {/* Left premium panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 p-10 text-white lg:flex xl:p-14">
          <div className="absolute -right-24 top-28 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -right-12 top-40 h-48 w-48 rounded-full border border-white/10" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-teal-400/10 blur-2xl" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-xl backdrop-blur">
              <FaHeartbeat />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">MediCare</h2>
              <p className="text-xs text-teal-100">Appointment Management</p>
            </div>
          </div>

          <div className="relative z-10 my-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-teal-50">
              <FaCheckCircle />
              Healthcare, made simpler
            </span>

            <h1 className="mt-7 text-4xl font-bold leading-tight xl:text-5xl">
              Your health.
              <br />
              Your time.
              <br />
              <span className="text-teal-300">Your care.</span>
            </h1>

            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-300">
              Connect with trusted doctors, manage appointments, and take
              control of your healthcare journey.
            </p>

            <div className="mt-9 flex items-center gap-4 border-t border-white/15 pt-6">
              <div className="flex -space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-teal-800 bg-teal-200 text-teal-900">
                  <FaUserMd />
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-teal-800 bg-blue-200 text-blue-900">
                  <FaUser />
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-teal-800 bg-amber-200 text-amber-900">
                  <FaHeartbeat />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold">Care that fits you</p>
                <p className="mt-1 text-xs text-slate-300">
                  A simpler way to manage your appointments
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-xs text-slate-400">
            <FaShieldAlt className="text-teal-300" />
            Your healthcare journey, in one place
          </div>
        </div>

        {/* Right login form */}
        <div className="p-6 sm:p-10 lg:p-12 xl:p-14">
          {/* Mobile logo */}
          <div className="mb-9 flex items-center gap-3 lg:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-700 text-lg text-white shadow-lg shadow-teal-200">
              <FaHeartbeat />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">MediCare</h2>
              <p className="text-xs text-slate-500">Appointment Management</p>
            </div>
          </div>

          <div className="mb-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
              Welcome back
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Sign in to your
              <br />
              account<span className="text-teal-600">.</span>
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Enter your details to access your account.
            </p>
          </div>

          {/* Role selection */}
          <div className="mb-7">
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Continue as
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setRole("patient");
                  setMessage("");
                }}
                className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition duration-200 ${
                  role === "patient"
                    ? "border-teal-600 bg-teal-50 ring-2 ring-teal-600/10"
                    : "border-slate-200 bg-white hover:border-teal-300 hover:bg-slate-50"
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    role === "patient"
                      ? "bg-teal-700 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <FaUser />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Patient</p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Book appointments
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setRole("doctor");
                  setMessage("");
                }}
                className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition duration-200 ${
                  role === "doctor"
                    ? "border-teal-600 bg-teal-50 ring-2 ring-teal-600/10"
                    : "border-slate-200 bg-white hover:border-teal-300 hover:bg-slate-50"
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    role === "doctor"
                      ? "bg-teal-700 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <FaUserMd />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Doctor</p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Manage appointments
                  </p>
                </div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email address
              </label>

              <div className="group relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-teal-700" />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-600/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>

              <div className="group relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-teal-700" />

                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3.5 pl-11 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-600/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-teal-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Remember / Forgot */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <label className="flex cursor-pointer items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 accent-teal-700 focus:ring-teal-600"
                />
                Remember me
              </label>

              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="font-semibold text-teal-700 transition hover:text-teal-900"
              >
                Forgot password?
              </button>
            </div>

            {/* Error / success message */}
            {message && (
              <div
                role="alert"
                className={`rounded-xl border px-4 py-3 text-sm ${
                  message.toLowerCase().includes("success")
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-red-200 bg-red-50 text-red-600"
                }`}
              >
                {message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-3 rounded-xl bg-teal-700 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition duration-200 hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-xl hover:shadow-teal-700/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Signing in..."
                : `Sign in as ${role === "doctor" ? "Doctor" : "Patient"}`}
              {!loading && (
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              )}
            </button>
          </form>

          {/* Register links */}
          <div className="mt-8 border-t border-slate-100 pt-6 text-center">
            <p className="text-sm text-slate-500">Don't have an account?</p>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-3 text-sm font-semibold">
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-teal-700 transition hover:text-teal-900"
              >
                Register as Patient
              </button>

              <span className="text-slate-300">|</span>

              <button
                type="button"
                onClick={() => navigate("/doctor/register")}
                className="text-teal-700 transition hover:text-teal-900"
              >
                Register as Doctor
              </button>
            </div>
          </div>

          <p className="mt-7 flex items-center justify-center gap-2 text-center text-xs text-slate-400">
            <FaShieldAlt className="text-teal-600" />
            Your healthcare information deserves care.
          </p>
        </div>
      </div>
    </div>
  );
}
