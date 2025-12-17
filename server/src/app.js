// import express from "express";
// import helmet from "helmet";
// import cookieParser from "cookie-parser";

// import { corsMiddleware } from "./config/cors.js";
// import { apiRateLimiter } from "./config/rateLimit.js";
// import { httpLogger } from "./utils/logger.js";
// import routes from "./routes/index.js";
// import { notFoundHandler, errorHandler } from "./middlewares/error.middleware.js";
// import path from "path";
// import { fileURLToPath } from "url";

// const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Serve uploaded files (avatars, later posts/stories)
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// // Security headers
// app.use(helmet());

// // Core middlewares
// app.use(corsMiddleware);
// app.use(cookieParser());
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true }));

// // Logging + rate limiting
// app.use(httpLogger);
// app.use("/api", apiRateLimiter);

// // API routes
// app.use("/api", routes);

// // Health root
// app.get("/", (_req, res) => {
//   res.send("NexaSpace API is running 🚀");
// });

// // 404 + error
// app.use(notFoundHandler);
// app.use(errorHandler);

// export default app;



// server/src/app.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";

import { corsOptions } from "./config/cors.js";
import { rateLimiter } from "./config/rateLimit.js";
import routes from "./routes/index.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import apiRouter from "./routes/index.js";

const app = express();

// If you ever deploy behind a proxy (Render/Heroku/etc.)
app.set("trust proxy", 1);

// Core middlewares
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Serve uploaded media (avatars, posts) at /uploads/*
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "src", "uploads"))
);

// Simple health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// API routes (v1)
app.use("/api/v1", rateLimiter, routes, apiRouter);

// Central error handler (must be last)
app.use(errorMiddleware);

export default app;
