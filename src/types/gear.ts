export interface Category {
  id: string;
  name: string;
  description: string | null;
}

export interface Provider {
  id: string;
  name: string;
  email: string;
}

export interface Gear {
  id: string;
  title: string;
  description: string;
  brand: string;
  image: string;
  pricePerDay: string;
  stock: number;
  availability: boolean;

  categoryId: string;
  providerId: string;

  category: Category;
  provider: Provider;

  createdAt: string;
  updatedAt: string;
}
