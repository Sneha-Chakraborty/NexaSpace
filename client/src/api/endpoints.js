// client/src/api/endpoints.js

// Base URL for your backend API
const DEFAULT_API_BASE = "http://localhost:5000/api/v1";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE;

// e.g. "http://localhost:5000" from "http://localhost:5000/api/v1"
export const API_ORIGIN = API_BASE_URL.replace(/\/api\/v1.*$/, "");

// Central list of endpoint paths
export const ENDPOINTS = {
  AUTH_REGISTER: "/auth/register",
  AUTH_LOGIN: "/auth/login",
  AUTH_ME: "/auth/me",

  USER_ME: "/users/me",
  USER_AVATAR: "/users/me/avatar",

  POSTS: "/posts",
  POSTS_FEED: "/posts/feed"
};

// Backwards-compatible auth endpoints object
export const AUTH_ENDPOINTS = {
  REGISTER: ENDPOINTS.AUTH_REGISTER,
  LOGIN: ENDPOINTS.AUTH_LOGIN,
  ME: ENDPOINTS.AUTH_ME
};


export const CHAT_ENDPOINTS = {
  LIST: "/chats",
  START: "/chats/start",
  MESSAGES: (chatId) => `/chats/${chatId}/messages`,
};
