export type UserType = {
  id: number;
  email: string;
  nickname: string;
  pw?: string;
  bank: string;
  accountNumber: string;
  avatar: string;
  level: number;
  emailToken?: string | null;
  pwToken?: string;
  isVerified: boolean;
};
