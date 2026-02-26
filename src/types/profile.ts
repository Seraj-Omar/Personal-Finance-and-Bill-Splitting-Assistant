import { url } from "inspector";

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  avatar?: Avatar[]
  defaultCurrencyId?: string | null;
}

export interface Avatar {
  id: string;
  url: string;
  
}
