export type UserType = {
  id: number;
  email: string;
  nickname: string;
  pw?: string;
  bank: string;
  accountNumber: string;
  emailToken: string | null;
  pwToken: string;
  isVerified: boolean;
};
