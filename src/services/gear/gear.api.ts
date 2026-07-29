import { api } from "@/lib/axios";

export const getFeaturedGear = async () => {
  const { data } = await api.get("/gear?limit=6");
  return data.data;
};

export const getAllGear = async () => {
  const { data } = await api.get("/gear");
  return data.data;
};

export const getSingleGear = async (id: string) => {
  const { data } = await api.get(`/gear/${id}`);
  return data.data;
};
