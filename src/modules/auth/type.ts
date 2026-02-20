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

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type MePayload = {
  user: {
    id: string;
    email: string;
    fullName: string;
    phone: string;
    role: string;
    status: string;
    defaultCurrencyId: string;
    currentBalance: string;
    points: string;
    avatarAssetId: unknown;
    provider: string;
    providerId: unknown;
    createdAt: string;
    updatedAt: string;
      currency?: {
    code: string;
    symbol?: string;
    id?: string;
    name?: string;
  };
  };
  token: string;
};

//rest password

export type PasswordResetRequestPayload = {
  email: string;
};

export type PasswordResetVerifyPayload = {
  email: string;
  code: string;
};

export type PasswordResetConfirmPayload = {
  password: string;
  confirmPassword?: string; // لو بدك تتحقق بالفرونت
  resetToken: string;
};

export type PasswordResetRequestRes = {
  success: true;
};

export type PasswordResetVerifyRes = {
  success: true;
  resetToken?: string; // ✅ لو الباك بيرجعه
};

export type PasswordResetConfirmRes = {
  success: true;
};
