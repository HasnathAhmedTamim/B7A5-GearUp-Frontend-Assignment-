import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/services/category/category.api";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
};
