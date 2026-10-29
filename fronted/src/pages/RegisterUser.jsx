import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/Register.js";
export default function RegisterUser() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const data = {
        name,
        email,
        password,
      };
      await registerUser(data);
      navigate("/login");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Register Form */}
        <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
         <h1 className="text-3xl font-bold text-gray-900">
  Create Patient Account
</h1>

<p className="mt-2 text-sm leading-6 text-gray-500">
  Register as a patient to find doctors, explore their specialties,
  and book appointments easily.
</p>



<div className="mt-6 text-center">
  <p className="text-sm text-gray-600">
    Are you a doctor?
  </p>

  <button
    type="button"
    onClick={() => navigate("/doctor/register")}
    className="mt-2 font-semibold text-blue-600 hover:text-blue-800"
  >
    Register as a Doctor
  </button>
</div>


          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-20 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-3 py-1 text-sm font-semibold text-blue-600 hover:bg-blue-50"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-50"
            >
             {loading ? "Creating Account..." : "Create Patient Account"}
            </button>
          </form>

<div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
  <h3 className="font-semibold text-blue-900">
    What happens next?
  </h3>

  <ol className="mt-3 space-y-2 text-sm text-blue-800">
    <li>1. Create your patient account.</li>
    <li>2. Log in to your account.</li>
    <li>3. Browse doctors and select a doctor.</li>
    <li>4. Choose a date and time.</li>
    <li>5. Confirm your appointment.</li>
  </ol>
</div>


          {message && <p className="mt-3 text-center text-sm">{message}</p>}
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-semibold text-blue-600 transition hover:text-blue-800 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
