"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyGear } from "@/services/gear/gear.api";

export const useMyGear = () => {
  return useQuery({
    queryKey: ["my-gear"],
    queryFn: getMyGear,
  });
};
