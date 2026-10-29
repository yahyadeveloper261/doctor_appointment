import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaThLarge,
  FaCalendarCheck,
  FaUserMd,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaStethoscope,
} from "react-icons/fa";

export default function DoctorSidebar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    {
      name: "Dashboard",
      path: "/doctor/dashboard",
      icon: <FaThLarge />,
    },
    {
      name: "My Appointments",
      path: "/doctor/appointments",
      icon: <FaCalendarCheck />,
    },
    {
      name: "My Profile",
      path: "/doctor/profile",
      icon: <FaUserMd />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Premium Menu Button */}
      <button
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        className="fixed left-5 top-5 z-[60] flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br from-teal-600 to-teal-800 text-xl text-white shadow-lg shadow-teal-900/25 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
      >
        <span className="transition-transform duration-300">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </span>
      </button>

      {/* Premium Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col overflow-y-auto border-r border-teal-100/70 bg-white px-5 pb-6 pt-24 shadow-2xl shadow-slate-900/10 transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="mb-9 rounded-2xl bg-gradient-to-br from-teal-700 via-teal-700 to-cyan-800 p-5 text-white shadow-lg shadow-teal-900/15">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-2xl ring-1 ring-white/20">
            <FaStethoscope />
          </div>

          <h2 className="text-xl font-bold tracking-tight">Doctor Portal</h2>

          <p className="mt-1 text-sm text-teal-100">
            Your professional workspace
          </p>
        </div>

        {/* Navigation */}
        <p className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
          Main Menu
        </p>

        <nav className="flex-1 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/doctor/dashboard"}
              className={({ isActive }) =>
                `group relative flex items-center gap-4 overflow-hidden rounded-xl px-4 py-3.5 font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-teal-700 text-white shadow-md shadow-teal-700/20"
                    : "text-slate-600 hover:translate-x-1 hover:bg-teal-50 hover:text-teal-800"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-lg transition-colors ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "bg-slate-100 text-slate-500 group-hover:bg-teal-100 group-hover:text-teal-700"
                    }`}
                  >
                    {link.icon}
                  </span>

                  <span className="flex-1">{link.name}</span>

                  {isActive && (
                    <span className="h-2 w-2 rounded-full bg-white shadow-sm" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-slate-100 pt-5">
          <div className="mb-4 rounded-xl bg-slate-50 px-4 py-3">
            <p className="text-sm font-semibold text-slate-700">
              Doctor Account
            </p>
            <p className="mt-1 text-xs text-slate-500">Manage your workspace</p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3.5 font-medium text-red-600 transition-all duration-200 hover:bg-red-50 active:scale-[0.98]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-lg">
              <FaSignOutAlt />
            </span>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
