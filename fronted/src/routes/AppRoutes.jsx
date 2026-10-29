import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Doctors from "../pages/Doctors";
import DoctorDetails from "../pages/DoctorDetails";
import Login from "../pages/Login";
import RegisterUser from "../pages/RegisterUser";
import MyAppointments from "../pages/MyAppointments";
import Appointment from "../pages/Appointment";
import DoctorDashboard from "../pages/DoctorDashboard";
import DoctorAppointments from "../components/doctors/DoctorAppointments";
import DoctorProfile from "../pages/DoctorProfile";
import EditProfile from "../components/doctors/EditProfile";
import RegisterDoctor from "../pages/RegisterDoctor";
export default function AppRoutes() {
  const [isLoggined, setIsLoggined] = useState(
    Boolean(localStorage.getItem("token")),
  );

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggined(Boolean(localStorage.getItem("token")));
    };

    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  useEffect(() => {
    window.updateLoginState = () => {
      setIsLoggined(Boolean(localStorage.getItem("token")));
    };

    return () => {
      delete window.updateLoginState;
    };
  }, []);

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggined(Boolean(localStorage.getItem("token")));
    };

    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctor/:id" element={<DoctorDetails />} />
      <Route path="/myappointments" element={<MyAppointments />} />
      <Route path="/appointment" element={<Appointment />} />
      <Route path="/doctor/register" element={<RegisterDoctor />} />
      <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
      <Route path="/doctor/appointments" element={<DoctorAppointments />} />
      <Route path="/doctor/profile" element={<DoctorProfile />} />
      <Route path="/doctor/editProfile" element={<EditProfile />} />
      <Route
        path="/login"
        element={isLoggined ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={isLoggined ? <Navigate to="/" replace /> : <RegisterUser/>}
      />
    </Routes>
  );
}
