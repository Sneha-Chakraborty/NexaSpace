// import axios from "axios";
// import { API_BASE_URL } from "./endpoints";
// import { ACCESS_TOKEN_KEY } from "../utils/constants";

// export const axiosInstance = axios.create({
//   baseURL: API_BASE_URL
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem(ACCESS_TOKEN_KEY);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );


// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Later: global error / toast handling
//     return Promise.reject(error);
//   }
// );



// client/src/api/axiosInstance.js
import axios from "axios";
import { API_BASE_URL } from "./endpoints";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,     // http://localhost:5000/api/v1 (by default)
  withCredentials: true      // 🔑 send cookies (JWT) with every request
});

export default axiosInstance;


//export { axiosInstance };