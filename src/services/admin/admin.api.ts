import { api } from "@/lib/axios";

export const getDashboardStats = async () => {
  const { data } = await api.get("/admin/stats");
  return data.data;
};

export const getAllUsers = async () => {
  const { data } = await api.get("/admin/users");
  return data.data;
};

export const updateUserStatus = async (
  id: string,
  status: "ACTIVE" | "BLOCKED",
) => {
  const { data } = await api.patch(`/admin/users/${id}`, { status });
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