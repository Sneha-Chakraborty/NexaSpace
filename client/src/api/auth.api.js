// client/src/api/auth.api.js
import axiosInstance from "./axiosInstance.js";
import { AUTH_ENDPOINTS } from "./endpoints.js";

// POST /auth/register
export const registerRequest = ({ email, username, name, password }) =>
  axiosInstance.post(AUTH_ENDPOINTS.REGISTER, {
    email,
    username,
    name,
    password,
  });

// POST /auth/login
export const loginRequest = ({ email, password }) =>
  axiosInstance.post(AUTH_ENDPOINTS.LOGIN, {
    email,
    password,
  });

// GET /auth/me
export const meRequest = () => axiosInstance.get(AUTH_ENDPOINTS.ME);

// POST /auth/logout
export const logoutRequest = () => axiosInstance.post(AUTH_ENDPOINTS.LOGOUT);
