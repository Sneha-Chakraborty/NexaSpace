import { ApiError } from "../utils/ApiError.js";

export const validateCreatePost = (req, _res, next) => {
  const { text } = req.body || {};

  if (!text && !req.file) {
    return next(
      new ApiError(400, "Post must contain some text or an image file")
    );
  }

  if (text && text.length > 2000) {
    return next(new ApiError(400, "Post text must be <= 2000 characters"));
  }

  if (text) {
    req.body.text = text.trim();
  }

  next();
};

export const validateFeedQuery = (req, _res, next) => {
  const pageRaw = req.query.page;
  const limitRaw = req.query.limit;

  let page = parseInt(pageRaw, 10);
  let limit = parseInt(limitRaw, 10);

  if (Number.isNaN(page) || page <= 0) page = 1;
  if (Number.isNaN(limit) || limit <= 0 || limit > 50) limit = 10;

  req.pagination = { page, limit };
  next();
};
