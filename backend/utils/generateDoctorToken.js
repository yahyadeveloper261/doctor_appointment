import jwt from "jsonwebtoken";
export const generateDoctorToken = (doctor) => {
  //Access Token
  const accessToken = jwt.sign(
    { doctorId: doctor._id, role: doctor.role },
    process.env.JWT,
    { expiresIn: "15m" },
  );
  //Refresh Token
  const refreshToken = jwt.sign(
    { doctorId: doctor._id },
    process.env.JWT_REFRESH,
    { expiresIn: "7d" },
  );
  return { accessToken, refreshToken };
};
