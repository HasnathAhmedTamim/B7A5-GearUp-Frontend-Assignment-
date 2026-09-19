export interface IRental {
  gearId: string;
  startDate: string;
  endDate: string;
  quantity: number;
}

export type RentalStatus =
  | "PLACED"
  | "CONFIRMED"
  | "PAID"
  | "PICKED_UP"
  | "RETURNED"
  | "CANCELLED"
  | "REJECTED"
  | string;

export interface IMyRental {
  id: string;
  gearId: string;
  status: RentalStatus;
  quantity: number;
  startDate: string;
  endDate: string;
  totalAmount: number;
  reviewed: boolean;
  payment: { id: string } | null;
  gear: {
    title: string;
    image: string;
    category: {
      name: string;
    };
  };
}
