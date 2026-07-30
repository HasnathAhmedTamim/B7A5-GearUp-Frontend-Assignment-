"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllGear } from "@/services/gear/gear.api";

export const useGear = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ["gear", params],
    queryFn: () => getAllGear(params),
  });
};
