import { useState } from "react";
import { NavLink} from "react-router-dom";
import { FaStethoscope, FaBars, FaXmark } from "react-icons/fa6";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Doctors", path: "/doctors" },
  { name: "Appointment", path: "/appointment" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentuser");

    window.location.href = "/login";
  };

  const linkClasses = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition-all duration-200
    ${isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2"
          onClick={() => setIsOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <FaStethoscope size={19} />
          </div>

          <div>
            <h1 className="text-lg font-bold leading-none text-gray-900">
              Medi<span className="text-blue-600">Care</span>
            </h1>
            <p className="mt-1 text-[10px] font-medium tracking-wide text-gray-400">
              HEALTHCARE
            </p>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={linkClasses}
            >
              {({ isActive }) => (
                <>
                  {link.name}

                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-blue-600" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="rounded-xl bg-red-500 px-5 py-2.5 font-semibold text-white shadow-md shadow-red-200 transition duration-200 hover:bg-red-600 hover:shadow-lg active:scale-95"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-blue-600"
            >
              Login
            </NavLink>
          )}

          {!isLoggedIn && (
            <NavLink
              to="/register"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
            >
              Get Started
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-100 md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <FaXmark size={21} /> : <FaBars size={21} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-gray-100 bg-white px-5 py-4 shadow-lg md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="my-2 h-px bg-gray-100" />

            {isLoggedIn ? (
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="rounded-lg bg-red-500 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-red-600 hover:shadow-md active:scale-[0.98]"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-blue-600"
              >
                Login
              </NavLink>
            )}

            <NavLink
              to="/register"
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Get Started
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
