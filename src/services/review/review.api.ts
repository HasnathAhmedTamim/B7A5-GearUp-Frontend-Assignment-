import { api } from "@/lib/axios";
import { ICreateReview, IReview } from "@/types/review";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const createReview = async (payload: ICreateReview) => {
  const { data } = await api.post<ApiResponse<IReview>>("/reviews", payload);

  return data;
};

export const getGearReviews = async (gearId: string) => {
  const { data } = await api.get<ApiResponse<IReview[]>>(`/reviews/${gearId}`);

  return data;
};
