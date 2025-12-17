import { ApiError } from "../utils/ApiError.js";

const isEmail = (value) =>
  typeof value === "string" &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const validateRegisterBody = (req, _res, next) => {
  const { email, username, password, name } = req.body;

  if (!email || !username || !password) {
    return next(
      new ApiError(400, "Email, username and password are required")
    );
  }

  if (!isEmail(email)) {
    return next(new ApiError(400, "Invalid email format"));
  }

  if (password.length < 6) {
    return next(new ApiError(400, "Password must be at least 6 characters"));
  }

  req.body.email = email.trim().toLowerCase();
  req.body.username = username.trim();
  if (name) req.body.name = String(name).trim();

  next();
};

export const validateLoginBody = (req, _res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ApiError(400, "Email and password are required"));
  }

  if (!isEmail(email)) {
    return next(new ApiError(400, "Invalid email format"));
  }

  req.body.email = email.trim().toLowerCase();
  next();
};
