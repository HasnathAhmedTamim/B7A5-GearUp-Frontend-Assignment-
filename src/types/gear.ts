import { ICategory } from "./category";

export interface IGear {
  id: string;

  title: string;
  description: string;
  brand: string;
  image: string;

  pricePerDay: number;
  stock: number;
  availability: boolean;

  categoryId: string;
  providerId: string;

  category: ICategory;

  provider?: {
    id: string;
    name: string;
    email?: string;
  };

  reviews?: Array<{
    id?: string;
    rating: number;
  }>;

  createdAt: string;
  updatedAt: string;
}

export interface ICreateGear {
  title: string;
  description: string;
  brand: string;
  image: string;

  pricePerDay: number;
  stock: number;

  categoryId: string;
}
