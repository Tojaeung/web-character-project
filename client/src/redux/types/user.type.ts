export type UserType = {
  id: number;
  email: string;
  nickname: string;
  pw?: string;
  bank: string;
  avatar: string;
  level: number;
  accountNumber: string;
  emailToken: string | null;
  pwToken: string;
  isVerified: boolean;
};
