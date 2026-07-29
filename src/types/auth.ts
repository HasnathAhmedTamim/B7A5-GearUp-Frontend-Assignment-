export type UserRole = "CUSTOMER" | "PROVIDER" | "ADMIN";

export type UserStatus = "ACTIVE" | "BLOCKED";

export interface Profile {
  id?: string;
  photo?: string | null;
  phone?: string | null;
  address?: string | null;
  bio?: string | null;
}

export interface User {
  id: string;
  name: string;
  email: string;

  role: UserRole;
  status: UserStatus;

  profile?: Profile | null;

  createdAt?: string;
  updatedAt?: string;
}
