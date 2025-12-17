// server/src/routes/v1/user.routes.js
import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import * as userController from "../../controllers/user.controller.js";
import { validateProfileUpdate } from "../../validations/user.validation.js";
import { avatarUpload } from "../../middlewares/upload.middleware.js";

const router = Router();

// All routes below require auth
router.use(authMiddleware);

// Current user profile
router.get("/me", userController.getMeProfile);
router.patch(
  "/me",
  validateProfileUpdate,
  userController.updateMeProfile
);
router.post(
  "/me/avatar",
  avatarUpload.single("avatar"),
  userController.uploadAvatar
);

//User search – /users/search?q=query
router.get("/search", userController.searchUsers);

// Follow / Unfollow
router.post("/:id/follow", userController.followUser);
router.delete("/:id/follow", userController.unfollowUser);

// Followers / Following lists
router.get("/:id/followers", userController.getFollowers);
router.get("/:id/following", userController.getFollowing);

export default router;
