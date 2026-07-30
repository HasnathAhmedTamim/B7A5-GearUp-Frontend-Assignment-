import { api } from "@/lib/axios";

export const createCheckoutSession = async (rentalOrderId: string) => {
  const { data } = await api.post("/payments/create", {
    rentalOrderId,
  });

  return data.data;
};

export const getMyPayments = async () => {
  const { data } = await api.get("/payments");
  return data.data;
};

export const getSinglePayment = async (id: string) => {
  const { data } = await api.get(`/payments/${id}`);
  return data.data;
};
