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
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api", doctorRoutes);
app.use("/api", appointmentRoutes);
app.use("/api", userRoutes);

const port = process.env.PORT;
const host = process.env.HOST;
app.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
dbConnection();
