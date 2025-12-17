import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

const JWT_EXPIRY = "7d";

export const signAccessToken = (user) => {
  const payload = {
    sub: user._id,
    role: user.role
  };
  return jwt.sign(payload, ENV.jwtSecret, { expiresIn: JWT_EXPIRY });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, ENV.jwtSecret);
};
