import express from "express";
import upload from "../middleware/multer.js";
import {
  getDoctors,
  getDoctorById,
  updateDoctor,
  createDoctor,
  deleteDoctor,
  registerDoctor,
  loginDoctor,
  doctorProfile,
  uploadDoctorPortfolio,
  refreshDoctorAccessToken,
} from "../controllers/doctorController.js";
import { auth, admin } from "../middleware/doctorAuth.js";
const router = express.Router();
router.post("/register", registerDoctor);
router.post("/login", loginDoctor);
router.get("/doctors", getDoctors);
router.get("/doctor/:id", getDoctorById);
router.get("/profile", auth, doctorProfile);
router.put("/updateProfile", auth, updateDoctor);
router.delete("/deleteDoctor/:id", auth, deleteDoctor);
router.post("/createDoctor", auth, admin, createDoctor);
router.post("/refresh-token",refreshDoctorAccessToken)
router.post(
  "/uploadPortfilo",
  auth,
  upload.single("image"),
  uploadDoctorPortfolio,
);

export default router;
