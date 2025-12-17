import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import {
  getCurrentUserProfile,
  updateCurrentUserProfile,
  updateUserAvatar
} from "../services/user.service.js";
import { processAvatarImage } from "../services/media.service.js";
import * as userService from "../services/user.service.js";

const buildProfilePayload = (user) => ({
  id: user._id,
  email: user.email,
  username: user.username,
  name: user.name,
  bio: user.bio,
  location: user.location,
  website: user.website,
  avatarUrl: user.avatarUrl,
  role: user.role,
  verified: user.verified,
  createdAt: user.createdAt
});

export const getMeProfile = asyncHandler(async (req, res) => {
  const user = await getCurrentUserProfile(req.user._id);

  res
    .status(200)
    .json(
      new ApiResponse(200, { user: buildProfilePayload(user) }, "Profile")
    );
});

export const updateMeProfile = asyncHandler(async (req, res) => {
  const user = await updateCurrentUserProfile(req.user._id, req.body);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: buildProfilePayload(user) },
        "Profile updated"
      )
    );
});

export const uploadAvatar = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatarUrl = await processAvatarImage(req.file);
  const user = await updateUserAvatar(req.user._id, avatarUrl);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: buildProfilePayload(user) },
        "Avatar updated"
      )
    );
});

export const followUser = asyncHandler(async (req, res) => {
  const targetUserId = req.params.id;
  const result = await userService.followUser(req.user._id, targetUserId);

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Followed user successfully"));
});

export const unfollowUser = asyncHandler(async (req, res) => {
  const targetUserId = req.params.id;
  const result = await userService.unfollowUser(req.user._id, targetUserId);

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Unfollowed user successfully"));
});

export const getFollowers = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { page = 1, limit = 20 } = req.query;

  const result = await userService.getFollowers(userId, {
    page: Number(page),
    limit: Number(limit)
  });

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Followers list fetched"));
});

export const getFollowing = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { page = 1, limit = 20 } = req.query;

  const result = await userService.getFollowing(userId, {
    page: Number(page),
    limit: Number(limit)
  });

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Following list fetched"));
});

export const searchUsers = asyncHandler(async (req, res) => {
  const { q = "", limit = 10 } = req.query;

  const users = await userService.searchUsers({
    query: q,
    limit: Number(limit)
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { users }, "User search results"));
});

