import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";

export const getCurrentUserProfile = async (userId) => {
  const user = await User.findById(userId).select("-passwordHash");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return user;
};

export const updateCurrentUserProfile = async (userId, update) => {
  const allowedFields = ["name", "bio", "location", "website"];
  const toSet = {};

  allowedFields.forEach((field) => {
    if (update[field] !== undefined) {
      toSet[field] = update[field];
    }
  });

  const user = await User.findByIdAndUpdate(
    userId,
    { $set: toSet },
    { new: true }
  ).select("-passwordHash");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

export const updateUserAvatar = async (userId, avatarUrl) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: { avatarUrl } },
    { new: true }
  ).select("-passwordHash");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

export const followUser = async (currentUserId, targetUserId) => {
  if (currentUserId.toString() === targetUserId) {
    throw new ApiError(400, "You cannot follow yourself");
  }

  const [currentUser, targetUser] = await Promise.all([
    User.findById(currentUserId),
    User.findById(targetUserId)
  ]);

  if (!targetUser) {
    throw new ApiError(404, "User not found");
  }

  const alreadyFollowing = currentUser.following.some(
    (id) => id.toString() === targetUserId
  );
  if (alreadyFollowing) {
    return { alreadyFollowing: true };
  }

  currentUser.following.push(targetUser._id);
  currentUser.followingCount = (currentUser.followingCount || 0) + 1;

  targetUser.followers.push(currentUser._id);
  targetUser.followersCount = (targetUser.followersCount || 0) + 1;

  await currentUser.save();
  await targetUser.save();

  return {
    followerId: currentUserId,
    followingId: targetUserId,
    followerCount: targetUser.followersCount,
    followingCount: currentUser.followingCount
  };
};

export const unfollowUser = async (currentUserId, targetUserId) => {
  if (currentUserId.toString() === targetUserId) {
    throw new ApiError(400, "You cannot unfollow yourself");
  }

  const [currentUser, targetUser] = await Promise.all([
    User.findById(currentUserId),
    User.findById(targetUserId)
  ]);

  if (!targetUser) {
    throw new ApiError(404, "User not found");
  }

  const beforeLen = currentUser.following.length;
  currentUser.following = currentUser.following.filter(
    (id) => id.toString() !== targetUserId
  );

  if (currentUser.following.length === beforeLen) {
    return { alreadyNotFollowing: true };
  }

  currentUser.followingCount = Math.max(
    0,
    (currentUser.followingCount || 0) - 1
  );

  targetUser.followers = targetUser.followers.filter(
    (id) => id.toString() !== currentUserId.toString()
  );
  targetUser.followersCount = Math.max(
    0,
    (targetUser.followersCount || 0) - 1
  );

  await currentUser.save();
  await targetUser.save();

  return {
    followerId: currentUserId,
    followingId: targetUserId,
    followerCount: targetUser.followersCount,
    followingCount: currentUser.followingCount
  };
};

export const getFollowers = async (userId, { page = 1, limit = 20 }) => {
  const skip = (page - 1) * limit;

  const user = await User.findById(userId)
    .select("followers followersCount")
    .populate({
      path: "followers",
      select: "username name profilePic verified",
      options: { skip, limit }
    });

  if (!user) throw new ApiError(404, "User not found");

  const followers = user.followers || [];
  const hasMore = skip + followers.length < (user.followersCount || 0);

  return {
    followers,
    total: user.followersCount || followers.length,
    hasMore
  };
};

export const getFollowing = async (userId, { page = 1, limit = 20 }) => {
  const skip = (page - 1) * limit;

  const user = await User.findById(userId)
    .select("following followingCount")
    .populate({
      path: "following",
      select: "username name profilePic verified",
      options: { skip, limit }
    });

  if (!user) throw new ApiError(404, "User not found");

  const following = user.following || [];
  const hasMore = skip + following.length < (user.followingCount || 0);

  return {
    following,
    total: user.followingCount || following.length,
    hasMore
  };
};


export const searchUsers = async ({ query, limit = 10 }) => {
  const q = (query || "").trim();
  if (!q) {
    return [];
  }

  const regex = new RegExp(q, "i"); // case-insensitive

  const users = await User.find({
    $or: [{ username: regex }, { name: regex }]
  })
    .select("username name avatarUrl verified followersCount followingCount")
    .limit(limit)
    .lean();

  return users;
};

