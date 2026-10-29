import express from "express";
import {
  createAppointment,
  getAppointments,
  getSingleAppointment,
  cancelAppointment,
  updateAppointment,
  getDoctorAppointments,
  getAllAppointments,
  getBookedSlots
} from "../controllers/appointmentController.js";
import { UserAdmin, UserAuth } from "../middleware/userAuth.js";
import { auth } from "../middleware/doctorAuth.js";
const router = express.Router();
router.post("/appointmentForm", UserAuth, createAppointment);
router.get("/myAppointments", UserAuth, getAppointments);
router.get("/doctorAppointments", auth, getDoctorAppointments);
router.put("/appointment/:id", auth, updateAppointment);
router.get("/appointment/:id", getSingleAppointment);
router.put("/cancelAppointment/:id", UserAuth, cancelAppointment);
router.get("/allAppointments", UserAuth, UserAdmin, getAllAppointments);
router.get("/booked-slots", getBookedSlots);

export default router;
