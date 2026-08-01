export interface IReview {
  id: string;

  gearId: string;

  rating: number;

  comment: string;

  createdAt: string;

  customer: {
    id: string;

    name: string;

    email: string;

    profile?: {
      photo?: string;
    } | null;
  };
}

export interface ICreateReview {
  gearId: string;

  rating: number;

  comment: string;
}
