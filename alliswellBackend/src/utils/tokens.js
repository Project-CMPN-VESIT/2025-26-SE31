import jwt from "jsonwebtoken";
import crypto from "crypto";

// Access Token 
export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id,role:user.role,name:user.name},
    process.env.ACCESS_SECRET_KEY,
    { expiresIn: "2h" }
  );
};

// Refresh Token
export const generateRefreshToken = () => {
  return crypto.randomBytes(40).toString("hex");
};

// Hash Token for Redis
export const hashToken = (token) => {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
};