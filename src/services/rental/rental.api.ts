import { api } from "@/lib/axios";
import { IRental } from "@/types/rental";

export const createRental = async (payload: IRental) => {
  const { data } = await api.post("/rentals", payload);
  return data;
};

export const getMyRentals = async () => {
  const { data } = await api.get("/rentals");
  return data.data;
};

export const getSingleRental = async (id: string) => {
  const { data } = await api.get(`/rentals/${id}`);
  return data.data;
};

export const getProviderOrders = async () => {
  const { data } = await api.get("/rentals/provider/orders");
  return data.data;
};

export const updateRentalStatus = async (
  id: string,
  status: "CONFIRMED" | "PICKED_UP" | "RETURNED",
) => {
  const { data } = await api.patch(`/rentals/provider/orders/${id}`, {
    status,
  });

  return data;
};
