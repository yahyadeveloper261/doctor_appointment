import React, { useEffect, useState } from "react";
import { Navigate,useSearchParams } from "react-router-dom";
import BookingForm from "../components/appointments/BookingForm";
import AppointmentCard from "../components/appointments/AppointmentCard";
import doctors from "../data/doctors";


export default function Appointment() {
  const [appointment, setAppointment] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("appointment")) || [];
    } catch (error) {
      return [];
    }
  });
  useEffect(() => {
    if (appointment.length > 0) {
      localStorage.setItem("appointment", JSON.stringify(appointment));
    } else {
      localStorage.removeItem("appointment");
    }
  }, [appointment]);
const currentUser = JSON.parse(
  localStorage.getItem("currentuser")
);

if (!currentUser) {
  return <Navigate to="/login" />;
}
  const [searchParms] = useSearchParams();
  const doctorId = searchParms.get("doctor");
  const selectedDoctor = doctors.find(
    (doctor) => doctor.id === Number(doctorId),
  );

  const handlebook=(data)=>{
    const newAppointment={
      ...data,
      userEmail:currentUser.email
    }
    setAppointment((prev)=>[...prev,newAppointment])
  }
  const myAppointment=appointment.filter((item)=>item.userEmail===currentUser.email)
  return (
    <div>
      <h2>Appointment</h2>
      <BookingForm onBook={handlebook} selectedDoctor={selectedDoctor} />
      {myAppointment.length > 0 &&
        myAppointment.map((item) => (
          <AppointmentCard
            onCancel={() =>
              setAppointment((prev) =>
                prev.filter((appointment) => appointment.id !== item.id),
              )
            }
            key={item.id}
            appointment={item}
          />
        ))}
    </div>
  );
}
