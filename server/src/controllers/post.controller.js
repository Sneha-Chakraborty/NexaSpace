// server/src/controllers/post.controller.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  createPost,
  getHomeFeed,
  getPostById
} from "../services/post.service.js";
import { processPostImage } from "../services/media.service.js";

const mapPost = (post) => ({
  id: post._id,
  _id: post._id,
  text: post.text,
  mediaUrl: post.mediaUrl,
  createdAt: post.createdAt,
  author: {
    id: post.author?._id,
    _id: post.author?._id,
    username: post.author?.username,
    name: post.author?.name,
    avatarUrl: post.author?.avatarUrl,
    verified: post.author?.verified
  }
});

export const createPostController = asyncHandler(async (req, res) => {
  const mediaUrl = req.file ? await processPostImage(req.file) : null;

  const post = await createPost({
    authorId: req.user._id,
    text: req.body.text,
    mediaUrl
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { post: mapPost(post) },
        "Post created successfully"
      )
    );
});

export const getFeedController = asyncHandler(async (req, res) => {
  // You can use req.pagination if you like, but this is simpler and
  // matches what the frontend sends (page & limit as query params).
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);

  const { posts, hasMore } = await getHomeFeed({
    userId: req.user._id,   // 🔑 important: who’s feed is this?
    page,
    limit
  });

  return res.json(
    new ApiResponse(
      200,
      {
        posts: posts.map(mapPost),
        page,
        limit,
        hasMore
      },
      "Feed"
    )
  );
});

export const getPostByIdController = asyncHandler(async (req, res) => {
  const post = await getPostById(req.params.id);
  return res.json(
    new ApiResponse(200, { post: mapPost(post) }, "Post details")
  );
});
