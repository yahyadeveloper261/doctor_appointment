
export default function AppointmentCard({ appointment , onCancel}) {
  return (
    <div className="my-6 w-full max-w-2xl mx-auto overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-blue-50 px-6 py-5">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Appointment Details
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your appointment has been booked successfully.
          </p>
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          Confirmed
        </span>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">

        {/* Doctor */}
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Doctor
          </p>

          <p className="mt-1 font-semibold text-gray-900">
            {appointment.doctor}
          </p>
        </div>

        {/* Patient */}
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Patient
          </p>

          <p className="mt-1 font-semibold text-gray-900">
            {appointment.name}
          </p>
        </div>

        {/* Date */}
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Date
          </p>

          <p className="mt-1 font-semibold text-gray-900">
            {appointment.date}
          </p>
        </div>

        {/* Time */}
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Time
          </p>

          <p className="mt-1 font-semibold text-gray-900">
            {appointment.time}
          </p>
        </div>

        {/* Reason */}
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 sm:col-span-2">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Reason for Visit
          </p>

          <p className="mt-1 text-sm leading-6 text-gray-700">
            {appointment.reason}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 px-6 py-5">
        <p className="text-center text-sm text-gray-500">
          Please arrive a few minutes before your appointment.
        </p>

        <button onClick={onCancel}
          type="button"
          className="mt-4 w-full rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-100 active:scale-[0.99]"
        >
          Cancel Appointment
        </button>
      </div>
    </div>
  );
}

