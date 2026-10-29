import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
const registerUser = async (req, res) => {
  try {
    // 1. Frontend se data lena
    const { name, email, password } = req.body;

    // 2. Check karna ke fields khali to nahi
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 3. Check karna ke email pehle se registered to nahi
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // 4. Password ko hash karna
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. User ko database mein save karna
    const user = await User.create({
      name,
      email,
      role: "patient",
      password: hashedPassword,
    });

    // 6. Response bhejna
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

const hashRefreshToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

// STEP 2: Login controller
const loginUser = async (req, res) => {
  try {
    // 1. Frontend se email aur password lo
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2. Database mein user dhoondo
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 3. Password verify karo
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 4. Dono tokens generate karo
    const { accessToken, refreshToken } = generateToken(user._id);

    // 5. Refresh Token ka hash banao
    const refreshTokenHash = hashRefreshToken(refreshToken);

    // 6. Hash MongoDB mein save karo
    user.refreshTokenHash = refreshTokenHash;
    await user.save();

    // 7. Asli Refresh Token cookie mein bhejo
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure:true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    // 8. Access Token frontend ko return karo
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: accessToken,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    // 1. Browser ki cookie se Refresh Token lo
    const oldRefreshToken = req.cookies?.refreshToken;

    if (!oldRefreshToken) {
      return res.status(401).json({
        message: "Refresh Token missing. Please login again",
      });
    }

    // 2. Refresh Token verify karo
    const decoded = jwt.verify(oldRefreshToken, process.env.JWT_REFRESH);
    req.user = decoded;

    // 3. Database se user aur saved hash lo
    const user = await User.findById(req.user.userId).select(
      "+refreshTokenHash",
    );

    if (!user || !user.refreshTokenHash) {
      return res.status(401).json({
        message: "Invalid refresh session. Please login again",
      });
    }

    // 4. Cookie wale token ka hash banao
    const oldHash = hashRefreshToken(oldRefreshToken);

    // 5. Database wale hash se compare karo
    if (oldHash !== user.refreshTokenHash) {
      return res.status(401).json({
        message: "Refresh Token invalid. Please login again",
      });
    }

    // 6. Dono naye tokens generate karo
    const { accessToken, refreshToken: newRefreshToken } = generateToken(
      user._id,
    );

    // 7. Naye Refresh Token ka hash save karo
    user.refreshTokenHash = hashRefreshToken(newRefreshToken);
    await user.save();

    // 8. Naya Refresh Token cookie mein set karo

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    // 9. Naya Access Token frontend ko bhejo
    return res.status(200).json({
      success: true,
      token: accessToken,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Session expired. Please login again",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    // 1. Browser ki Refresh Token cookie lo
    const refreshToken = req.cookies?.refreshToken;

    // 2. Agar cookie hai, to us token ko verify karke
    // us user ka refresh session invalidate karo
    if (refreshToken) {
      try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH);

        const user = await User.findById(decoded.userId).select(
          "+refreshTokenHash",
        );

        if (user) {
          const tokenHash = hashRefreshToken(refreshToken);

          // Sirf matching session ka hash clear karo
          if (user.refreshTokenHash === tokenHash) {
            user.refreshTokenHash = undefined;
            await user.save();
          }
        }
      } catch (error) {
        throw error;
      }
    }
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

const getMyProfile = async (req, res) => {
  try {
    const isAdmin = req.user.role === "admin";
    const targetUserId = req.params.id || req.user.userId;

    const isOwner = String(targetUserId) === String(req.user.userId);
    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: "You cannot get this profile" });
    }
    const userId = isAdmin ? targetUserId : req.user.userId;
    const profile = await User.findById(userId).select("-password -role");
    if (!profile) {
      return res.status(400).json({ message: "profile not found" });
    }
    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ message: "failed to get profile" });
  }
};

const updateMyProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const isAdmin = req.user.role === "admin";
    const targetUserId = req.params.id || req.user.userId;
    const isOwner = String(targetUserId) === String(req.user.userId);
    if (!isAdmin && !isOwner) {
      return res
        .status(403)
        .json({ message: "You cannot update this profile" });
    }
    if (!name?.trim()) {
      return res.status(400).json({ message: "Name is required" });
    }
    const userId = isAdmin ? targetUserId : req.user.userId;
    const profile = await User.findByIdAndUpdate(
      userId,
      { name: name.trim() },
      { new: true, runValidators: true },
    ).select("-password -role");
    if (!profile) {
      return res.status(404).json({ message: "profile not found" });
    }
    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ message: "failed to update profile" });
  }
};
export {
  registerUser,
  loginUser,
  logoutUser,
  getMyProfile,
  updateMyProfile,
  refreshAccessToken,
};
