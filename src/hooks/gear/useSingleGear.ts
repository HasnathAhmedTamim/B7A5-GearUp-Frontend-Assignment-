"use client";

import { useQuery } from "@tanstack/react-query";
import { getSingleGear } from "@/services/gear/gear.api";

export const useSingleGear = (id: string) => {
  return useQuery({
    queryKey: ["gear", id],
    queryFn: () => getSingleGear(id),
    enabled: !!id,
  });
};
