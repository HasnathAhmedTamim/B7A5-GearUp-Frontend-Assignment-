import axios from "axios";
import { api } from "@/lib/axios";
import { User } from "@/types/auth";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const loginUser = async (payload: LoginPayload) => {
  const { data } = await api.post<ApiResponse<User>>("/auth/login", payload);
  return data;
};

export const registerUser = async (payload: RegisterPayload) => {
  const { data } = await api.post<ApiResponse<User>>(
    "/users/register",
    payload,
  );

  return data;
};

export const getCurrentUser = async () => {
  try {
    const { data } = await api.get<ApiResponse<User>>("/auth/me");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return {
        success: false,
        message: "Unauthenticated",
        data: null,
      };
    }

    throw error;
  }
};

export const logoutUser = async () => {
  const { data } = await api.post<ApiResponse<null>>("/auth/logout");
  return data;
};
