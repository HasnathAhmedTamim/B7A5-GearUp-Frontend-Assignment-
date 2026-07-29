import { api } from "@/lib/axios";

export const getFeaturedGear = async () => {
  const { data } = await api.get("/gear?limit=6");

  return data.data;
};
