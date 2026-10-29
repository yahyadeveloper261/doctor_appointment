import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { bookAppointment,getBookedSlots } from "../../services/appointmentApi";

export default function BookingForm({ selectedDoctor }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);
  const navigate=useNavigate()



  
const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
];


useEffect(() => {
  if (!selectedDoctor?._id || !date) {
    setBookedSlots([]);
    return;
  }

  const loadBookedSlots = async () => {
    try {
      const data = await getBookedSlots(selectedDoctor._id, date);
      setBookedSlots(data.bookedSlots || []);
    } catch (err) {
      setError(err.message || "Failed to load booked slots");
    }
  };

  loadBookedSlots();
}, [selectedDoctor?._id, date]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const token=localStorage.getItem("token");
    if(!token){
    alert("please Login")
    navigate("/login")
    return
    }
    e.preventDefault();
    setError("");

    if (!selectedDoctor?._id) {
      setError("Please select a doctor.");
      return;
    }

    try {
      setLoading(true);
      const result = await bookAppointment({
        name, date, time, reason,
        doctor: selectedDoctor._id,
      });
      if (!result) throw new Error("Booking failed");
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (success)
    return (
      <div className="mx-auto mt-10 max-w-lg rounded-xl bg-white p-6 text-center shadow">
        <h2 className="text-xl font-bold text-green-600">Appointment Booked!</h2>
        <Link className="mt-3 inline-block text-teal-600" to="/myappointments">
          View My Appointments →
        </Link>
      </div>
    );

  const input = "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100";

  return (
    <div className="bg-gray-50 px-4 py-6">
      <form onSubmit={handleSubmit}
        className="mx-auto max-w-2xl rounded-2xl bg-white p-5 shadow-md sm:p-6">

        <h2 className="text-2xl font-bold text-gray-800">
          Book Appointment
        </h2>
        <p className="mb-4 mt-1 text-sm text-gray-500">
          {selectedDoctor?.name || "Loading doctor..."} · {selectedDoctor?.specialty || ""}
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Patient Name</label>
            <input className={input} value={name} onChange={e => setName(e.target.value)}
              placeholder="Your full name" required />
          </div>

          
<input
  type="date"
  value={date}
  min={new Date().toLocaleDateString("en-CA")}
onChange={(e) => {
  setDate(e.target.value);
  setTime("");
  setError("");
}}
  required
  className={input}
/>


        
<div>
  <label className="mb-1 block text-sm font-medium text-gray-700">
    Select Time
  </label>

  <select
    value={time}
    onChange={(e) => setTime(e.target.value)}
    required
    className={input}
  >
    <option value="">Choose a time slot</option>

   {timeSlots.map((slot) => {
  const isBooked = bookedSlots.includes(slot);
  const isSelected = time === slot;

  return (
    <option
      key={slot}
      value={slot}
      disabled={isBooked}
      style={{
        color: isBooked ? "red" : "black",
        backgroundColor: isBooked ? "#fee2e2" : "white",
      }}
    >
      {isBooked ? `${slot} - BOOKED` : slot}
    </option>
  );
})}
  </select>
</div>


          <div>
            <label className="mb-1 block text-sm font-medium">Reason</label>
            <input className={input} value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="Reason for visit" required />
          </div>
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

       <div className="mt-4 flex gap-3">

  <button
    type="button"
    onClick={() => navigate(-1)}
    className="flex-1 rounded-lg border border-gray-300 py-2.5 text-gray-700 hover:bg-gray-100"
  >
    Cancel
  </button>
  
  <button
    type="submit"
    disabled={loading}
    className="flex-1 rounded-lg bg-teal-600 py-2.5 text-white hover:bg-teal-700 disabled:opacity-50"
  >
    {loading ? "Booking..." : "Confirm Appointment"}
  </button>
</div>
      </form>
    </div>
  );
}
