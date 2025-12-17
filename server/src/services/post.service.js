import { Post } from "../models/Post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.model.js";

export const createPost = async ({ authorId, text, mediaUrl }) => {
  const post = await Post.create({
    author: authorId,
    text,
    mediaUrl
  });

  return post.populate("author", "username name avatarUrl verified");
};

export const getHomeFeed = async ({ userId, page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;

  const me = await User.findById(userId).select("following");
  const authorIds = [userId, ...(me?.following || [])];

  const query = { author: { $in: authorIds } };

  const [posts, total] = await Promise.all([
    Post.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "username name avatarUrl verified")
      .lean(),
    Post.countDocuments(query)
  ]);

  const hasMore = skip + posts.length < total;

  return { posts, hasMore };
};


export const getPostById = async (postId) => {
  const post = await Post.findById(postId).populate(
    "author",
    "username name avatarUrl verified"
  );
  if (!post) {
    throw new ApiError(404, "Post not found");
  }
  return post;
};
