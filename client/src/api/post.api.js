// client/src/api/post.api.js
import axiosInstance from "./axiosInstance";
import { ENDPOINTS } from "./endpoints";

// Create a post (text + optional image)
export const createPostRequest = (formData) =>
  axiosInstance.post(ENDPOINTS.POSTS, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

// Get home feed (paginated)
export const getFeedRequest = (params) =>
  axiosInstance.get(ENDPOINTS.POSTS_FEED, { params });
