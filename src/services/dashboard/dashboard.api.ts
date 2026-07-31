import { api } from "@/lib/axios";

export const getProviderDashboard = async () => {
  const { data } = await api.get("/dashboard/provider");

  return data.data;
};
