export type UserType = {
  id: number;
  chatId: string;
  email: string;
  nickname: string;
  desc: string;
  avatar: string;
  avatarKey: string;
  cover: string;
  coverKey: string;
  role: string;
  emailToken: null;
  isVerified: boolean;
  exp: number;
  created_at: Date;
  updated_at: Date;
};

export type DrawingType = {
  id: number;
  content: string;
  url: string;
  key: string;
  views: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  user?: UserType;
  comments?: DrawingCommentType[];
  likes?: DrawingLikeType[];
  dislikes?: DrawingDisLikeType[];
};
export type DrawingCommentType = {
  id: number;
  content: string;
  user_id: number;
  drawing_id: number;
  created_at: Date;
  updated_at: Date;
  user?: UserType | null;
};

export type DrawingLikeType = {
  id: number;
  valuerId: number;
  drawing_id: number;
};

export type DrawingDisLikeType = {
  id: number;
  valuerId: number;
  drawing_id: number;
};

export type PostType = {
  id: number;
  title: string;
  content: string;
  views: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  user?: UserType;
  comments?: FreeCommentType[] | CommissionCommentType[] | RequeCommentType[] | SaleCommentType[];
  likes?: FreeLikeType[] | CommissionLikeType[] | RequeLikeType[] | SaleDisLikeType[];
  dislikes?: FreeDisLikeType[] | CommissionDisLikeType[] | RequeDisLikeType[] | SaleDisLikeType[];
};

export type FreeCommentType = {
  id: number;
  content: string;
  user_id: number;
  free_id: number;
  created_at: Date;
  updated_at: Date;
  user?: UserType;
};

export type CommissionCommentType = {
  id: number;
  content: string;
  user_id: number;
  commission_id: number;
  created_at: Date;
  updated_at: Date;
  user?: UserType;
};

export type RequeCommentType = {
  id: number;
  content: string;
  user_id: number;
  reque_id: number;
  created_at: Date;
  updated_at: Date;
  user?: UserType;
};

export type SaleCommentType = {
  id: number;
  content: string;
  user_id: number;
  sale_id: number;
  created_at: Date;
  updated_at: Date;
  user?: UserType;
};

export type FreeLikeType = {
  id: number;
  valuerId: number;
  free_id: number;
};

export type FreeDisLikeType = {
  id: number;
  valuerId: number;
  free_id: number;
};

export type CommissionLikeType = {
  id: number;
  valuerId: number;
  commission_id: number;
};

export type CommissionDisLikeType = {
  id: number;
  valuerId: number;
  commission_id: number;
};

export type RequeLikeType = {
  id: number;
  valuerId: number;
  reque_id: number;
};

export type RequeDisLikeType = {
  id: number;
  valuerId: number;
  reque_id: number;
};
export type SaleLikeType = {
  id: number;
  valuerId: number;
  sale_id: number;
};

export type SaleDisLikeType = {
  id: number;
  valuerId: number;
  sale_id: number;
};

export type ChatUserType = {
  chatId: string;
  nickname: string;
  avatar: string;
  lastType: string | null;
  lastMessage: string | null;
  lastDate: string | null;
};

export type MessageType = {
  type: string;
  to: string;
  from: string;
  content: string;
  imgKey: string;
  date: string;
};

export type MsgNotiType = {
  from: string;
  to: string;
};
