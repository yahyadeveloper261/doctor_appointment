import { useEffect, useState } from "react";
import DoctorSidebar from "../components/doctors/DoctorSidebar";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { doctorProfile } from "../services/doctorApi";
import {
  UserRound,
  MapPin,
  Mail,
  Star,
  BriefcaseMedical,
  Banknote,
  Stethoscope,
  LoaderCircle,
} from "lucide-react";

export default function DoctorProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await doctorProfile();
        setProfile(data.doctor);
      } catch (err) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    getProfile();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-slate-50">
        <DoctorSidebar />
        <div className="flex min-h-screen items-center justify-center pl-20">
          <LoaderCircle className="animate-spin text-teal-600" size={40} />
        </div>
      </div>
    );

  if (error || !profile)
    return (
      <div className="min-h-screen bg-slate-50">
        <DoctorSidebar />
        <p className="p-10 pl-24 text-red-600">
          {error || "Profile not found"}
        </p>
      </div>
    );

  const details = [
    { label: "Specialty", value: profile.specialty, icon: Stethoscope },
    {
      label: "Experience",
      value: `${profile.experience ?? 0} years`,
      icon: BriefcaseMedical,
    },
    {
      label: "Consultation Fee",
      value: `Rs. ${profile.fee ?? 0}`,
      icon: Banknote,
    },
    { label: "City", value: profile.city, icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <DoctorSidebar />

      <main className="min-h-screen px-5 pb-10 pl-24 pt-24 lg:px-12 lg:pl-28">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
          <p className="mb-8 mt-2 text-slate-500">
            Your professional information at a glance.
          </p>

          {/* Profile header */}
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="h-36 bg-gradient-to-r from-teal-900 via-teal-700 to-cyan-500" />

            <div className="flex flex-col gap-5 px-6 pb-7 sm:flex-row sm:items-end">
              <div className="-mt-14 h-28 w-28 shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-teal-50 shadow-md">
                {profile.image ? (
                  <img
                    src={profile.image}
                    alt={profile.name || "Doctor"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-teal-700">
                    <UserRound size={45} />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold text-slate-900">
                  {profile.name || "Doctor Name"}
                </h2>
                <p className="mt-1 flex items-center gap-2 font-medium text-teal-700">
                  <Stethoscope size={17} />
                  {profile.specialty || "Specialty not added"}
                </p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={16} /> {profile.city || "City not added"}
                  </span>
                  <span className="flex items-center gap-1.5 break-all">
                    <Mail size={16} /> {profile.email || "Email unavailable"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start rounded-xl bg-amber-50 px-4 py-3 sm:self-end">
                <Star size={20} className="fill-amber-400 text-amber-500" />
                <div>
                  <p className="font-bold text-slate-900">
                    {profile.rating ?? "N/A"}
                  </p>
                  <p className="text-xs text-slate-500">Rating</p>
                </div>
              </div>

              <button
                onClick={() => navigate("/doctor/editProfile")}
                className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 hover:shadow-md"
              >
                <Pencil size={17} />
                Edit Profile
              </button>
            </div>
          </section>

          {/* Information cards */}
          <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {details.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500">{label}</p>
                  <div className="rounded-xl bg-teal-50 p-2.5 text-teal-700">
                    <Icon size={20} />
                  </div>
                </div>
                <p className="mt-4 break-words text-xl font-bold text-slate-900">
                  {value || "Not added"}
                </p>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
