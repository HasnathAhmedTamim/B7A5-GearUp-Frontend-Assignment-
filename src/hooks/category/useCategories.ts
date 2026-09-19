import { useQuery } from "@tanstack/react-query";

import { getAllCategories } from "@/services/category/category.api";
import { ICategory } from "@/types/category";

export const useCategories = () => {
  return useQuery<ICategory[]>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
};
