// server/src/middlewares/error.middleware.js
import { ApiError } from "../utils/ApiError.js";

export const errorMiddleware = (err, _req, res, _next) => {
  // If it's our custom ApiError, it already has status/message.
  const statusCode = err instanceof ApiError ? err.statusCode : err.status || 500;
  const message =
    err instanceof ApiError ? err.message : err.message || "Internal server error";

  const responseBody = {
    success: false,
    message
  };

  // In non-production, send some debug info
  if (process.env.NODE_ENV !== "production") {
    responseBody.stack = err.stack;
  }

  res.status(statusCode).json(responseBody);
};
