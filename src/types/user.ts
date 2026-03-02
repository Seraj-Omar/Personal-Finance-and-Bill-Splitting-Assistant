export type UserStatus = "ACTIVE" | "INACTIVE";

export interface User {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  status: UserStatus;
}