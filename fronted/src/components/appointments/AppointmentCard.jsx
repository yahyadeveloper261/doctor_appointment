
export default function AppointmentCard({ appointment,handleCancel }) {
  if (!appointment) return null;

  const doctor = appointment.doctor;
  const status = (appointment.status || "pending").toLowerCase();

  const statusStyle = {
    pending: "bg-amber-100 text-amber-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    
    <div className="flex flex-col justify-between gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-lg sm:flex-row sm:items-center">

      {/* Left: Doctor */}
      <div className="flex items-center gap-4">
        <img
          src={doctor?.image || "/doctor-placeholder.png"}
          alt={doctor?.name || "Doctor"}
          className="h-20 w-20 rounded-xl object-cover"
        />

        <div>
          <h2 className="font-bold text-gray-900">
            {doctor?.name || "Doctor"}
          </h2>

          <p className="text-sm text-blue-600">
            {doctor?.specialty || "Specialist"}
          </p>

          <p className="text-sm text-gray-500">
            {doctor?.city || "City"}
          </p>

          <span
            className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${
              statusStyle[status] || "bg-gray-100 text-gray-700"
            }`}
          >
            {status}
          </span>
        </div>
      </div>

      {/* Right: Appointment Details */}
      <div className="space-y-2 border-t pt-4 sm:border-0 sm:pt-0 sm:text-right">
        <p className="font-bold text-gray-900">
          Rs. {doctor?.fee ?? "N/A"}
        </p>

        <p className="text-sm text-gray-600">
          Date: {appointment.date
            ? new Date(appointment.date).toLocaleDateString("en-PK")
            : "N/A"}
        </p>

        <p className="text-sm text-gray-600">
          Time: {appointment.time || "N/A"}
        </p>
      </div>
      {appointment.status === "pending" && (
  <button
    onClick={() => handleCancel(appointment._id)}
    className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
  >
    Cancel Appointment
  </button>
)}
    </div>
  
     
  );
}
