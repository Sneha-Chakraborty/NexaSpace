import { ApiError } from "../utils/ApiError.js";

export const validateProfileUpdate = (req, _res, next) => {
  const { name, bio, location, website } = req.body || {};

  const clean = {};

  if (name !== undefined) {
    if (typeof name !== "string") {
      return next(new ApiError(400, "Name must be a string"));
    }
    clean.name = name.trim();
  }

  if (bio !== undefined) {
    if (typeof bio !== "string") {
      return next(new ApiError(400, "Bio must be a string"));
    }
    if (bio.length > 280) {
      return next(new ApiError(400, "Bio must be at most 280 characters"));
    }
    clean.bio = bio.trim();
  }

  if (location !== undefined) {
    if (typeof location !== "string") {
      return next(new ApiError(400, "Location must be a string"));
    }
    clean.location = location.trim();
  }

  if (website !== undefined) {
    if (typeof website !== "string") {
      return next(new ApiError(400, "Website must be a string URL"));
    }
    clean.website = website.trim();
  }

  req.body = clean;
  next();
};
