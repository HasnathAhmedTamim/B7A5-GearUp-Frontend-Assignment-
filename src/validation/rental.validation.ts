import { z } from "zod";

export const rentalSchema = z.object({
  gearId: z.string(),

  startDate: z.string().min(1, "Start date is required"),

  endDate: z.string().min(1, "End date is required"),

  quantity: z.coerce.number().int().positive("Quantity must be at least 1"),
});

export type RentalFormData = z.infer<typeof rentalSchema>;
