import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchDoctor() {
  return (
    <section className="bg-white px-5 py-10">
      <div className="mx-auto max-w-3xl">
        
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-md transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
          
          <FaMagnifyingGlass className="text-gray-400" size={20} />

          <input
            type="text"
            placeholder="Search doctor by name or specialty..."
            className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 sm:text-base"
          />

          <button
            type="button"
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Search
          </button>

        </div>

      </div>
    </section>
  );
}
