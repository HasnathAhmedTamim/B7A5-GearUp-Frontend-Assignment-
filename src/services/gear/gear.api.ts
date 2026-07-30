import { api } from "@/lib/axios";

export const getFeaturedGear = async () => {
  const { data } = await api.get("/gear?limit=6");
  return data.data;
};
export const getAllGear = async (params?: Record<string, unknown>) => {
  const { data } = await api.get("/gear", {
    params,
  });

  return data;
};
export const getSingleGear = async (id: string) => {
  const { data } = await api.get(`/gear/${id}`);
  return data.data;
};

/* ---------------- Provider ---------------- */

export const getMyGear = async () => {
  const { data } = await api.get("/gear/provider/my-gear");
  return data;
};

export const createGear = async (payload: {
  title: string;
  description: string;
  brand: string;
  image: string;
  pricePerDay: number;
  stock: number;
  categoryId: string;
}) => {
  const { data } = await api.post("/gear", payload);
  return data;
};

export const updateGear = async (
  id: string,
  payload: Partial<{
    title: string;
    description: string;
    brand: string;
    image: string;
    pricePerDay: number;
    stock: number;
    categoryId: string;
  }>
) => {
  const { data } = await api.patch(`/gear/${id}`, payload);
  return data;
};

export const deleteGear = async (id: string) => {
  const { data } = await api.delete(`/gear/${id}`);
  return data;
};