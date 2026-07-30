import { api } from "@/lib/axios";

export const getAllCategories = async () => {
  const { data } = await api.get("/categories");
  return data.data;
};

export const getCategoryById = async (id: string) => {
  const { data } = await api.get(`/categories/${id}`);
  return data.data;
};

export const createCategory = async (payload: {
  name: string;
  description?: string;
}) => {
  const { data } = await api.post("/categories", payload);
  return data;
};

export const updateCategory = async (
  id: string,
  payload: {
    name?: string;
    description?: string;
  },
) => {
  const { data } = await api.patch(`/categories/${id}`, payload);
  return data;
};

export const deleteCategory = async (id: string) => {
  const { data } = await api.delete(`/categories/${id}`);
  return data;
};
