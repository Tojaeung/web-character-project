export type UserType = {
  id: string;
  email: string;
  nickname: string;
  pw?: string;
  bank: string;
  accountNumber: string;
  avatar: string;
  avatarKey: string;
  level: number;
  emailToken?: string | null;
  pwToken?: string;
  isVerified: boolean;
};
