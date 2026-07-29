export interface Gear {
  id: string;
  title: string;
  description: string;
  brand: string;
  image: string;
  pricePerDay: number;
  stock: number;
  availability: boolean;
  providerId: string;
  categoryId: string;
}
