
import { useState, useEffect, useRef } from "react";
import { registerDoctor } from "../services/doctorApi";
import { useNavigate } from "react-router-dom";

import {
  Stethoscope,
  UserRound,
  Mail,
  LockKeyhole,
  MapPin,
  Wallet,
  BriefcaseMedical,
  ArrowRight,
  ShieldCheck,
  LoaderCircle,
  Eye,
  EyeOff,
} from "lucide-react";

export default function RegisterDoctor() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [city, setCity] = useState("");
  const [fee, setFee] = useState("");
  const [experience, setExperience] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const messageRef = useRef(null);

  useEffect(() => {
    if (error || success) {
      messageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [error, success]);

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // 1. Name limit
    if (name.trim().length < 3 || name.trim().length > 60) {
      setError("Name must be between 3 and 60 characters.");
      return;
    }

    // 2. Email limit and format
    const normalizedEmail = email.trim().toLowerCase();

    if (
      normalizedEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
    ) {
      setError("Please enter a valid email (maximum 254 characters).");
      return;
    }

    // 3. Password limit and strength
    if (!passwordPattern.test(password)) {
      setError(
        "Password must be 8-64 characters with uppercase, lowercase, number and special character (@$!%*?&)."
      );
      return;
    }

    // 4. Specialty limit
    if (
      specialty.trim().length < 3 ||
      specialty.trim().length > 60
    ) {
      setError("Specialty must be between 3 and 60 characters.");
      return;
    }

    // 5. City limit
    if (city.trim().length < 2 || city.trim().length > 60) {
      setError("City must be between 2 and 60 characters.");
      return;
    }

    // 6. Fee limit
    const doctorFee = Number(fee);

    if (
      fee.trim() === "" ||
      !Number.isFinite(doctorFee) ||
      doctorFee < 0 ||
      doctorFee > 100000
    ) {
      setError("Consultation fee must be between 0 and 100,000 PKR.");
      return;
    }

    // 7. Experience limit
    const doctorExperience = Number(experience);

    if (
      experience.trim() === "" ||
      !Number.isInteger(doctorExperience) ||
      doctorExperience < 0 ||
      doctorExperience > 60
    ) {
      setError("Experience must be a whole number between 0 and 60 years.");
      return;
    }

    setLoading(true);

    try {
      const data = {
        name: name.trim(),
        email: normalizedEmail,
        password,
        specialty: specialty.trim(),
        city: city.trim(),
        fee: doctorFee,
        experience: doctorExperience,
      };

      await registerDoctor(data);

      setSuccess("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);
    } catch (err) {
      setError(
        err.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      label: "Full Name",
      placeholder: "Dr. Ahmed Khan",
      value: name,
      onChange: setName,
      type: "text",
      icon: UserRound,
      autoComplete: "name",
      minLength: 3,
      maxLength: 60,
    },
    {
      label: "Email Address",
      placeholder: "doctor@example.com",
      value: email,
      onChange: setEmail,
      type: "email",
      icon: Mail,
      autoComplete: "email",
      maxLength: 254,
    },
    {
      label: "Password",
      placeholder: "Create a strong password",
      value: password,
      onChange: setPassword,
      type: "password",
      icon: LockKeyhole,
      autoComplete: "new-password",
      minLength: 8,
      maxLength: 64,
    },
    {
      label: "Medical Specialty",
      placeholder: "e.g. Cardiologist",
      value: specialty,
      onChange: setSpecialty,
      type: "text",
      icon: Stethoscope,
      minLength: 3,
      maxLength: 60,
    },
    {
      label: "City",
      placeholder: "e.g. Lahore",
      value: city,
      onChange: setCity,
      type: "text",
      icon: MapPin,
      minLength: 2,
      maxLength: 60,
    },
    {
      label: "Consultation Fee (PKR)",
      placeholder: "e.g. 1500",
      value: fee,
      onChange: setFee,
      type: "number",
      icon: Wallet,
      min: "0",
      max: "100000",
      step: "1",
    },
    {
      label: "Experience (years)",
      placeholder: "e.g. 5",
      value: experience,
      onChange: setExperience,
      type: "number",
      icon: BriefcaseMedical,
      min: "0",
      max: "60",
      step: "1",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:py-14">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 lg:grid-cols-5">

        {/* Left panel */}
        <div className="relative overflow-hidden bg-gradient-to-br from-teal-800 via-teal-700 to-cyan-700 p-8 text-white sm:p-10 lg:col-span-2 lg:p-12">
          <div className="pointer-events-none absolute -right-20 -top-16 h-64 w-64 rounded-full border-[35px] border-white/10" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-cyan-300/10 blur-2xl" />

          <div className="relative z-10 flex h-full flex-col">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                <Stethoscope size={26} />
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight">
                  MediCare
                </h2>
                <p className="text-xs text-teal-100">
                  Doctor Appointment Platform
                </p>
              </div>
            </div>

            <div className="my-12 lg:my-16">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-teal-50">
                <ShieldCheck size={15} />
                Professional Doctor Portal
              </span>

              <h1 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl">
                Your expertise.
                <br />
                Better patient care.
              </h1>

              <p className="mt-5 text-sm leading-7 text-teal-50 sm:text-base">
                Create your professional account to manage your practice
                and connect with patients through one simple platform.
              </p>
            </div>

            <div className="mt-auto rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  className="mt-0.5 shrink-0 text-teal-100"
                  size={22}
                />

                <div>
                  <p className="font-semibold">
                    Your professional journey starts here
                  </p>

                  <p className="mt-1 text-sm leading-6 text-teal-100">
                    Set up your account now. You can add your profile
                    picture after logging in.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Registration form */}
        <div className="p-6 sm:p-10 lg:col-span-3 lg:p-12">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">
                Doctor Registration
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Create your account
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter your professional details to get started.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div ref={messageRef} className="scroll-mt-8">
                {error && (
                  <div
                    role="alert"
                    className="mb-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
                  >
                    {error}
                  </div>
                )}

                {success && (
                  <div
                    role="status"
                    className="mb-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-700"
                  >
                    {success}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {fields.map((field) => {
                  const Icon = field.icon;

                  return (
                    <div
                      key={field.label}
                      className={
                        ["Full Name", "Email Address", "Password"].includes(
                          field.label
                        )
                          ? "sm:col-span-2"
                          : ""
                      }
                    >
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        {field.label}
                        <span className="ml-1 text-red-500">*</span>
                      </label>

                      <div className="relative">
                        <Icon
                          size={18}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          type={
                            field.label === "Password"
                              ? showPassword
                                ? "text"
                                : "password"
                              : field.type
                          }
                          placeholder={field.placeholder}
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          required
                          autoComplete={field.autoComplete}
                          min={field.min}
                          max={field.max}
                          step={field.step}
                          minLength={field.minLength}
                          maxLength={field.maxLength}
                          disabled={loading}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3.5 pl-11 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-600/10 disabled:cursor-not-allowed disabled:opacity-60"
                        />

                        {field.label === "Password" && (
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={loading}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-700 disabled:cursor-not-allowed"
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        )}
                      </div>

                      {field.label === "Password" && (
                        <p className="mt-2 text-xs leading-5 text-slate-500">
                          8-64 characters with uppercase, lowercase, number
                          and special character (@$!%*?&).
                        </p>
                      )}

                      {field.label === "Consultation Fee (PKR)" && (
                        <p className="mt-2 text-xs text-slate-500">
                          Enter an amount from 0 to 100,000 PKR.
                        </p>
                      )}

                      {field.label === "Experience (years)" && (
                        <p className="mt-2 text-xs text-slate-500">
                          Enter a whole number from 0 to 60.
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-teal-50 p-4">
                <ShieldCheck
                  className="mt-0.5 shrink-0 text-teal-700"
                  size={20}
                />

                <p className="text-xs leading-5 text-slate-600">
                  Your profile picture is optional during registration.
                  You can upload it later from your Edit Profile page.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3.5 font-semibold text-white shadow-lg shadow-teal-700/20 transition hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-600/20 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <LoaderCircle size={19} className="animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Register as Doctor
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <button
                type="button"
                disabled={loading}
                onClick={() => navigate("/login")}
                className="font-semibold text-teal-700 transition hover:text-teal-900 disabled:opacity-50"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
