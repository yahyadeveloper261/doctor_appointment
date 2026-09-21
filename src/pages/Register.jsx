
import React, { useEffect, useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [store, setStore] = useState(()=>{
    return JSON.parse(localStorage.getItem("store"))||[]
  });
 useEffect(()=>{
  localStorage.setItem("store",JSON.stringify(store))
 },[store])
 
 const exitUser=store.some((item)=>item.email.toLowerCase()===email.trim().toLowerCase());

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return alert("Please enter your name.");
    if (!email.trim()) return alert("Please enter your email.");
    if (!password.trim()) return alert("Please enter your password.");
if(exitUser) return alert("alreay email exit")
    setStore((prev) => [...prev, { name, email, password }]);

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10">

      <div className="mx-auto max-w-5xl">

        {/* Register Form */}
        <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">

          <div className="mb-7 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Register your account to get started
            </p>
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
              className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]"
            >
              Register
            </button>

          </form>
        </div>

        {/* Store */}
        {store.length > 0 && (
          <div className="mt-10">

            <div className="mb-5">
              <h2 className="text-2xl font-bold text-gray-900">
                Registered Users
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Total Users: {store.length}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {store.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                >

                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
                    {item.name.charAt(0).toUpperCase()}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {item.email}
                  </p>

                  <div className="mt-4 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-500">
                    Password: ••••••••
                  </div>

                </div>
              ))}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

