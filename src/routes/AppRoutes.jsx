import React from "react";
import { Navigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Appointment from "../pages/Appointment";
import Doctors from "../pages/Doctors";
import DoctorDetails from "../pages/DoctorDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
export default function AppRoutes() {

  return (
    <Routes>
      <Route
        path="/"
        element={
          localStorage.getItem("isLoggedIn") === "true" ? (
            <Home />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
  <Route
  path="/doctors"
  element={
    localStorage.getItem("isLoggedIn") === "true"
      ? <Doctors />
      : <Navigate to="/login" />
  }
/>

<Route
  path="/doctor/:id"
  element={
    localStorage.getItem("isLoggedIn") === "true"
      ? <DoctorDetails />
      : <Navigate to="/login" />
  }
/>

<Route
  path="/appointment"
  element={
    localStorage.getItem("isLoggedIn") === "true"
      ? <Appointment />
      : <Navigate to="/login" />
  }
/>
      <Route path="/login" element={<Login />} />
      <Route
  path="/register"
  element={
    localStorage.getItem("isLoggedIn") === "true"
      ? <Navigate to="/" />
      : <Register />
  }
/>
    </Routes>
  );
}
