import jwt from "jsonwebtoken";
const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token Required" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT);
    req.doctor = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

const admin = (req, res, next) => {
  try {
    if (req.doctor.role !== "admin") {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: "Failed to verify admin",
    });
  }
};

export { auth, admin };
