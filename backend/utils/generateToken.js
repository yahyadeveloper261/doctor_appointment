
import jwt from "jsonwebtoken";
export default function generateToken(userId) {
  ///accessToken
  const accessToken = jwt.sign({ userId }, process.env.JWT_USER, {
    expiresIn: "20s",
  });
  ///refreshToken
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH,{expiresIn:"7d",});
  return {accessToken,refreshToken}
}
