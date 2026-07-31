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

  async (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // avoid redirect loop

      if (
        typeof window !== "undefined" &&
        !window.location.pathname.includes("/login")
      ) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);
