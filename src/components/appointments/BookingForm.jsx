import { useState } from "react";
import doctors from "../../data/doctors";
export default function BookingForm({ onBook, selectedDoctor }) {
  const [doctor, setDoctor] = useState(selectedDoctor?.name || "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!doctor) return alert("Please select a doctor.");

    if (!date) return alert("Please select an appointment date.");

    if (!time) return alert("Please select an appointment time.");

    if (!name.trim()) return alert("Please enter the patient's name.");

    if (!reason.trim()) return alert("Please enter the reason for your visit.");

    onBook({
        id:Date.now(),
      doctor,
      time,
      date,
      name,
      reason,
    });
    setSuccess(true);
  };

  return (
    <div>
      {success ? (
        <div className="w-full max-w-2xl mx-auto rounded-2xl border border-green-100 bg-white p-8 text-center shadow-lg">
          {" "}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            {" "}
            <span className="text-2xl text-green-600">✓</span>{" "}
          </div>{" "}
          <h2 className="mt-5 text-2xl font-bold text-gray-900">
            {" "}
            Appointment Booked!{" "}
          </h2>{" "}
          <p className="mt-2 text-sm text-gray-500">
            {" "}
            Your appointment has been successfully booked.{" "}
          </p>{" "}
          <div className="mt-6 rounded-xl bg-green-50 p-4 text-sm text-green-700">
            {" "}
            Please check your appointment details below.{" "}
          </div>{" "}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="w-full max-w-2xl mx-auto rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Book an Appointment
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Fill in the details below to schedule your appointment.
              </p>
            </div>

            <div className="space-y-5">
              {/* Doctor */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Select Doctor
                </label>

                <select
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Choose a doctor</option>
                  {doctors.map((doc) => (
                    <option key={doc.id} value={doc.name}>
                      {doc.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Appointment Date
                  </label>

                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Appointment Time
                  </label>

                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Patient Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Patient Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter patient name"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Reason */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Reason for Visit
                </label>

                <textarea
                  rows={4}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Briefly describe the reason for your visit..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                ></textarea>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
