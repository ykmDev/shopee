import axios from "axios";
import { clearUser } from "../features/auth/authSlice";

const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "production" ? "https://dummyjson.com/" : "https://dummyjson.com/",
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    Accept: "application/json",
  },
});

// Intercept response to handle session expiration
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { status } = error.response;

    if (status === 401) {
      // Clear user from Redux store
      clearUser();
      // Clear user from local storage
      localStorage.removeItem("user");

      window.location.reload();
    }

    // Pass the error along to the next error handler
    return Promise.reject(error);
  }
);

export default axiosInstance;
