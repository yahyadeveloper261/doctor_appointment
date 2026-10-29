import jwt from "jsonwebtoken";

const UserAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token required",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_USER);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired access token",
    });
  }
};

const UserAdmin = (req, res, next) => {
  try {
    if (req.user.userId !== "admin") {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Failed to verify admin",
    });
  }
};

export { UserAuth, UserAdmin };
