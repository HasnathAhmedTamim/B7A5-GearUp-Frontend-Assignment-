import { z } from "zod";

export const addGearSchema = z.object({
  title: z.string().min(3, "Title is required"),

  description: z.string().min(10, "Description is required"),

  brand: z.string().min(2, "Brand is required"),

  image: z.string().url("Please enter a valid image URL"),

  pricePerDay: z.preprocess(
    (value) => Number(value),
    z.number().positive("Price must be greater than 0"),
  ),

  stock: z.preprocess(
    (value) => Number(value),
    z.number().int().positive("Stock must be greater than 0"),
  ),

  categoryId: z.string().min(1, "Please select a category"),
});

export type AddGearFormData = z.infer<typeof addGearSchema>;
export type UpdateGearFormData = Partial<AddGearFormData>;