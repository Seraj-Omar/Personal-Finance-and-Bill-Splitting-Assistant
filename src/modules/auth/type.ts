export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
};

export type UserRole = "USER" | "ADMIN";
export type UserStatus = "ACTIVE" | "SUSPENDED";

export type User = {
  id: string;
  fullName: string;
  email: string;

  role: UserRole;
  status: UserStatus;

  avatarAssetId?: string;   
  provider?: string;           
  providerId?: string;

  defaultCurrency?: string;    
  currentBalance?: string;     
  points?: string;           

  createdAt?: string;         
  updatedAt?: string;          
};
