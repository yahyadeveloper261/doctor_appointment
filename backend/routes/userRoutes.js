import express from "express";
import {
  registerUser,
  loginUser,
  getMyProfile,
  updateMyProfile,
  refreshAccessToken,
  logoutUser,
} from "../controllers/userController.js";
import { UserAuth } from "../middleware/userAuth.js";
const router = express.Router();
router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.get("/myProfile", UserAuth, getMyProfile);
router.post("/updateMyProfile", UserAuth, updateMyProfile);
router.post("/refreshToken", refreshAccessToken);
router.post("/logout", logoutUser);
export default router;
