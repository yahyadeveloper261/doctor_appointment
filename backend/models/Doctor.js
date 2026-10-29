import mongoose from "mongoose";
const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    specialty: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    fee: { type: Number, required: true, trim: true },
    rating: { type: Number, default: 0 },
    experience: { type: Number, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["doctor", "admin"],
      default: "doctor",
    },
    refreshTokenHash: {
      type: String,
      default: null,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
