import axiosInstance from "./axiosInstance";

export const getMyProfile = () => axiosInstance.get("/users/me");

export const updateMyProfile = (payload) =>
  axiosInstance.patch("/users/me", payload);

export const uploadAvatar = (file) => {
  const formData = new FormData();
  formData.append("avatar", file);
  return axiosInstance.post("/users/me/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

export const followUserRequest = (userId) =>
  axiosInstance.post(`/users/${userId}/follow`);

export const unfollowUserRequest = (userId) =>
  axiosInstance.delete(`/users/${userId}/follow`);

export const getFollowersRequest = (userId, params) =>
  axiosInstance.get(`/users/${userId}/followers`, { params });

export const getFollowingRequest = (userId, params) =>
  axiosInstance.get(`/users/${userId}/following`, { params });


export const searchUsersRequest = (query) =>
  axiosInstance.get("/users/search", {
    params: { q: query, limit: 10 }
  });


  