// import { Router } from "express";

// const router = Router();

// // Simple health check – used by client / devops etc.
// router.get("/health", (req, res) => {
//   res.json({ status: "ok", uptime: process.uptime() });
// });

// // TODO: plug in /v1/auth, /v1/users, etc. as you build features.

// export default router;


import { Router } from "express";
import authRoutes from "./v1/auth.routes.js";
import userRoutes from "./v1/user.routes.js";
import postRoutes from "./v1/post.routes.js"; //added for feature5.
import chatRoutes from "./v1/chat.routes.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/chats", chatRoutes);

export default router;
