export type UserType = {
  id: string;
  email: string;
  nickname: string;
  description: string;
  pw?: string;
  bank: string;
  avatar: string;
  avatarKey: string;
  level: number;
  accountNumber: string;
  emailToken: string | null;
  pwToken?: string;
  isVerified: boolean;
  followers: string[];
  followings: string[];
};
