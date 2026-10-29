import Doctor from "../models/Doctor.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import cloudinary from "../src/config/cloudinary.js"; 
import crypto from 'crypto'
import { generateDoctorToken } from "../utils/generateDoctorToken.js";
///helper function for token hash
const hashRefreshToken=(token)=>{
return crypto.createHash("sha256").update(token).digest("hex")
}
// 1. Doctor Profile
const doctorProfile = async (req, res) => {
  try {
    const isAdmin = req.doctor.role === "admin";
    const doctorId = isAdmin ? req.params.id : req.doctor.doctorId;

    const doctor = await Doctor.findById(doctorId).select("-password -role");

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve doctor profile",
    });
  }
};

// 2. Register Doctor

const registerDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      specialty,
      city,
      image,
      fee,
      experience,
    } = req.body;

    // 1. Required fields
    if (
      !name?.trim() ||
      !email?.trim() ||
      !password ||
      !specialty?.trim() ||
      !city?.trim() ||
      fee == null ||
      experience == null
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // 2. Name limit: 3-60 characters
    if (name.trim().length < 3 || name.trim().length > 60) {
      return res.status(400).json({
        success: false,
        message: "Name must be between 3 and 60 characters",
      });
    }

    // 3. Email limit and format
    const normalizedEmail = email.trim().toLowerCase();

    if (
      normalizedEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email (maximum 254 characters)",
      });
    }

    // 4. Password: 8-64 characters
    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;

    if (!strongPassword.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be 8-64 characters and include uppercase, lowercase, number, and special character (@$!%*?&)",
      });
    }

    // 5. Specialty limit: 3-60 characters
    if (
      specialty.trim().length < 3 ||
      specialty.trim().length > 60
    ) {
      return res.status(400).json({
        success: false,
        message: "Specialty must be between 3 and 60 characters",
      });
    }

    // 6. City limit: 2-60 characters
    if (city.trim().length < 2 || city.trim().length > 60) {
      return res.status(400).json({
        success: false,
        message: "City must be between 2 and 60 characters",
      });
    }

    // 7. Fee: numeric value from 0 to 100,000
    const doctorFee = Number(fee);

    if (
      !Number.isFinite(doctorFee) ||
      doctorFee < 0 ||
      doctorFee > 100000
    ) {
      return res.status(400).json({
        success: false,
        message: "Fee must be between 0 and 100000",
      });
    }

    // 8. Experience: whole number from 0 to 60 years
    const doctorExperience = Number(experience);

    if (
      !Number.isInteger(doctorExperience) ||
      doctorExperience < 0 ||
      doctorExperience > 60
    ) {
      return res.status(400).json({
        success: false,
        message: "Experience must be a whole number between 0 and 60",
      });
    }

    // 9. Check duplicate email
    const existEmail = await Doctor.findOne({
      email: normalizedEmail,
    });

    if (existEmail) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered",
      });
    }

    // 10. Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // 11. Create doctor
    const register = await Doctor.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashPassword,
      specialty: specialty.trim(),
      city: city.trim(),
      image: "",
      fee: doctorFee,
      experience: doctorExperience,
      role: "doctor",
    });

    return res.status(201).json({
      success: true,
      message: "Doctor registered successfully",
      doctor: {
        id: register._id,
        name: register.name,
        email: register.email,
        specialty: register.specialty,
        city: register.city,
        image: register.image,
        fee: register.fee,
        rating: register.rating,
        experience: register.experience,
        role: register.role,
      },
    });
  }
  catch (error) {
  console.error("REGISTER DOCTOR ERROR:", error);

  return res.status(500).json({
    success: false,
    message: error.message || "Failed to register doctor",
  });

}}


// 3. Login Doctor
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Required fields
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2. Login input limits
    if (email.trim().length > 254 || password.length > 64) {
      return res.status(400).json({
        success: false,
        message: "Email or password exceeds the maximum allowed length",
      });
    }

    // 3. Find doctor
    const doctor = await Doctor.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    if (!doctor) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 4. Compare password
    const isMatch = await bcrypt.compare(password, doctor.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 5. Generate tokens
    const { accessToken, refreshToken } = generateDoctorToken(doctor);

    const refreshTokenHash = hashRefreshToken(refreshToken);
    doctor.refreshTokenHash = refreshTokenHash;

    await doctor.save();

    // 6. Set refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      name: doctor.name,
      email: doctor.email,
      token: accessToken,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to log in",
    });
  }
};



// Refresh Doctor Access Token
const refreshDoctorAccessToken = async (req, res) => {
  try {
    // 1. Cookie se Refresh Token lo
    const oldRefreshToken = req.cookies?.refreshToken;

    if (!oldRefreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh Token missing. Please login again",
      });
    }

    // 2. Refresh Token verify karo
    const decoded = jwt.verify(
      oldRefreshToken,
      process.env.JWT_REFRESH
    );

    // 3. Database se doctor aur saved hash lo
    const doctor = await Doctor.findById(
      decoded.doctorId
    ).select("+refreshTokenHash");

    if (!doctor || !doctor.refreshTokenHash) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh session. Please login again",
      });
    }

    // 4. Cookie wale token ka hash banao
    const oldHash = hashRefreshToken(oldRefreshToken);

    // 5. Database hash se compare karo
    if (oldHash !== doctor.refreshTokenHash) {
      return res.status(401).json({
        success: false,
        message: "Refresh Token invalid. Please login again",
      });
    }

    // 6. Naya Access Token aur Refresh Token banao
    const { accessToken, refreshToken: newRefreshToken } =
      generateDoctorToken(doctor);

    // 7. Naye Refresh Token ka hash save karo
    doctor.refreshTokenHash = hashRefreshToken(newRefreshToken);

    await doctor.save();

    // 8. Naya Refresh Token cookie mein set karo
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    // 9. Naya Access Token frontend ko bhejo
    return res.status(200).json({
      success: true,
      token: accessToken,
    });

  } catch (error) {
    console.error("Refresh Doctor Token Error:", error);

    return res.status(401).json({
      success: false,
      message: "Session expired. Please login again",
       debug: error.message,
    });
  }
};



// 4. Get All Doctors
const getDoctors = async (req, res) => {
  try {
    const { search, page, limit,specialty} = req.query;
    const skip = (Number(page) - 1) * limit;
    let doctors = await Doctor.find().select("-password");

    if (search) {
      doctors = doctors.filter((doc) =>
        doc.name?.toLowerCase().includes(search.toLowerCase()),
      );
    }
  if (specialty) {
      doctors = doctors.filter(
        (doc) =>
          doc.specialty?.toLowerCase() === specialty.toLowerCase()
      );
    }

    const total = doctors.length;
    const totalPages = Math.ceil(total / Number(limit));

    doctors = doctors.slice(skip, skip + Number(limit));
    res.status(200).json({
      success: true,
      message: doctors.length
        ? "Doctors retrieved successfully"
        : "No doctors found",
      doctors,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve doctors",
    });
  }
};

// 5. Get Doctor By ID
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select("-password");

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor retrieved successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve doctor",
    });
  }
};

// 6. Update Doctor
const updateDoctor = async (req, res) => {
  try {
    const isAdmin = req.doctor.role === "admin";

    const targetId = isAdmin ? req.body.doctorId : req.doctor.doctorId;

    if (isAdmin && !targetId) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID is required",
      });
    }

    const isOwner = String(targetId) === String(req.doctor.doctorId);

    if (!isAdmin && !isOwner) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own profile",
      });
    }

    const { name, specialty, city, fee, experience, image } = req.body;

    const doctorId = isAdmin ? targetId : req.doctor.doctorId;

    const doctor = await Doctor.findByIdAndUpdate(
      doctorId,
      {
        name,
        specialty,
        city,
        fee,
        experience,
        image,
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password");

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor profile updated successfully",
      doctor,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update doctor profile",
    });
  }
};

// 7. Create Doctor (Admin)
const createDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      specialty,
      experience,
      fee,
      rating,
      city,
      image,
    } = req.body;

    if (
      !name?.trim() ||
      !email?.trim() ||
      !password?.trim() ||
      !specialty?.trim() ||
      experience == null ||
      fee == null ||
      rating == null ||
      !city?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const emailExist = await Doctor.findOne({
      email: normalizedEmail,
    });

    if (emailExist) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = await Doctor.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      specialty: specialty.trim(),
      experience,
      fee,
     rating: Number(rating),
      city: city.trim(),
      image,
      role: "doctor",
    });

    res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        specialty: doctor.specialty,
        experience: doctor.experience,
        fee: doctor.fee,
        rating: doctor.rating,
        city: doctor.city,
        image: doctor.image,
        role: doctor.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create doctor",
    });
  }
};

// 8. Delete Doctor (Admin)
const deleteDoctor = async (req, res) => {
  try {
    const isAdmin = req.doctor.role === "admin";

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only administrators can delete doctors",
      });
    }

    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete doctor",
    });
  }
};

const uploadDoctorPortfolio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json([
        {
          success: false,
          message: "please uplaod an image",
        },
      ]);
    }
    const image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(image, {
      folder: "doctorAppointment",
      resource_type: "image",
    });

    const imageUrl = result.secure_url;
    const doctor = await Doctor.findByIdAndUpdate(
      req.doctor.doctorId,
      { image: imageUrl },
      { new: true },
    );
    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      public_id: result.public_id,
      imageUrl: doctor.image,
    });
  } catch (error) {
    console.error("Image upload error:", error);

    return res.status(500).json({
      success: false,
      message: "Image upload failed",
    });
  }
};
export {
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
};
