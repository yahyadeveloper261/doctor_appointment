import React from "react";
import { BrowserRouter, useLocation } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";

function AppContent() {
  const location = useLocation();

  const isDoctorPage = [
    "/doctor/dashboard",
    "/doctor/appointments",
    "/doctor/profile",
    "/doctor/editProfile"
  ].some(
    (path) =>
      location.pathname === path || location.pathname.startsWith(path + "/"),
  );

  return (
    <>
      <ScrollToTop />

      {!isDoctorPage && <Navbar />}

      <AppRoutes />

      {!isDoctorPage && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
