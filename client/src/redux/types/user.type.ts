export type UserType = {
  id: string;
  email: string;
  nickname: string;
  pw?: string;
  bank: string;
  avatar: string;
  avatarKey: string;
  level: number;
  accountNumber: string;
  emailToken: string | null;
  pwToken?: string;
  isVerified: boolean;
};
