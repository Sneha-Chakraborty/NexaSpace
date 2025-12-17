//role-based gate.
import { ApiError } from "../utils/ApiError.js";

export const adminMiddleware = (req, _res, next) => {
  if (!req.user || req.user.role !== "admin") {
    throw new ApiError(403, "Admin access required");
  }
  next();
};
