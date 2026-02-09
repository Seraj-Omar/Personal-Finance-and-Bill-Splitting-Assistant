export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  avatarAssetId?: string | null;
}
