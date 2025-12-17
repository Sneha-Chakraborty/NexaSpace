import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import {
  createPostController,
  getFeedController,
  getPostByIdController
} from "../../controllers/post.controller.js";
import {
  validateCreatePost,
  validateFeedQuery
} from "../../validations/post.validation.js";
import { postMediaUpload } from "../../middlewares/upload.middleware.js";

const router = Router();

router.use(authMiddleware);

// POST /posts  (create new post)
router.post(
  "/",
  postMediaUpload.single("media"),
  validateCreatePost,
  createPostController
);

// GET /posts/feed?page=&limit=
router.get("/feed", validateFeedQuery, getFeedController);

// GET /posts/:id
router.get("/:id", getPostByIdController);

export default router;
