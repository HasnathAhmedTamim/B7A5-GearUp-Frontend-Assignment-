import { api } from "@/lib/axios";

export const getAllCategories = async () => {
  const { data } = await api.get("/category");
  return data;
};

export const getCategoryById = async (id: string) => {
  const { data } = await api.get(`/category/${id}`);
  return data;
};

export const createCategory = async (payload: { name: string }) => {
  const { data } = await api.post("/category", payload);
  return data;
};

export const updateCategory = async (
  id: string,
  payload: {
    name?: string;
  },
) => {
  const { data } = await api.patch(`/category/${id}`, payload);
  return data;
};

export const deleteCategory = async (id: string) => {
  const { data } = await api.delete(`/category/${id}`);
  return data;
};
