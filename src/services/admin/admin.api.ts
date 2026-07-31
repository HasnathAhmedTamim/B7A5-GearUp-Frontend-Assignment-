import { api } from "@/lib/axios";

export const getDashboardStats = async () => {
  const { data } = await api.get("/dashboard/admin");
  return data.data;
};

export const getAllUsers = async () => {
  const { data } = await api.get("/admin/users");
  return data.data;
};

export const updateUserStatus = async (
  id: string,
  status: "ACTIVE" | "SUSPENDED",
) => {
  const { data } = await api.patch(`/users/${id}/status`, {
    status,
  });

  return data.data;
};
export const getRecentRentals = async () => {
  const { data } = await api.get("/dashboard/admin/recent-rentals");
  return data.data;
};
export const getAllGear = async () => {
  const { data } = await api.get("/admin/gear");
  return data.data;
};

export const getAllRentals = async () => {
  const { data } = await api.get("/admin/rentals");
  return data.data;
};

export const getMe = async () => {
  const { data } = await api.get("/auth/me");
  return data.data;
};