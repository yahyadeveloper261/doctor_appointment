import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dbConnection from "./src/config/db.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
const app = express();



app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://doctor-appointment-two-kappa.vercel.app",
    ],
    credentials: true,
  })
);



app.get("/", (req, res) => {
  res.send("Backend is running");
});
app.use(express.json());
app.use(cookieParser());
app.use("/api", doctorRoutes);
app.use("/api", appointmentRoutes);
app.use("/api", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
dbConnection();
