import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    // Don't redirect here.
    // Let each protected page handle authentication.
    return Promise.reject(error);
  },
);
