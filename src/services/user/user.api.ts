import { api } from "@/lib/axios";

export interface UpdateProfilePayload {
  name?: string;
  photo?: string;
  phone?: string;
  address?: string;
  bio?: string;
}

export const updateProfile = async (payload: UpdateProfilePayload) => {
  const { data } = await api.patch("/users/profile", payload);

  return data;
};
