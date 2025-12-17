import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { verifyAccessToken } from "../utils/token.js";
import { User } from "../models/User.model.js";

export const authMiddleware = asyncHandler(async (req, _res, next) => {
  const authHeader = req.headers.authorization;

  // 1) Try Bearer header
  let token = null;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // 2) Fallback to cookie
  if (!token && req.cookies) {
    token = req.cookies.accessToken || req.cookies.token;
  }

  if (!token) {
    throw new ApiError(401, "Authentication required");
  }

  try {
    const payload = verifyAccessToken(token);

    const user = await User.findById(payload.sub).select("-passwordHash");
    if (!user) {
      throw new ApiError(401, "User not found");
    }

    req.user = user;
    next();
  } catch (_err) {
    throw new ApiError(401, "Invalid or expired token");
  }
});
