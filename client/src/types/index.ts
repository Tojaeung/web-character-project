export type UserType = {
  id: number;
  userId: string;
  email: string;
  nickname: string;
  desc: string;
  avatar: string;
  avatarKey: string;
  cover: string;
  coverKey: string;
  role: string;
  emailToken: string | null;
  isVerified: boolean;
  exp: number;
  created_at: Date;
  updated_at: Date;
};

export type DrawingCommentType = {
  id: number;
  content: string;
  user_id: number;
  drawing_id: number;
  created_at: Date;
  updated_at: Date;
  user: UserType;
};

export type DrawingLikeType = {
  id: number;
  user_id: number;
  drawing_id: number;
};

export type DrawingDisLikeType = {
  id: number;
  user_id: number;
  drawing_id: number;
};

export type DrawingType = {
  id: number;
  title: string;
  content: string;
  url: string;
  key: string;
  views: number;
  user_id: number;
  drawingComments: DrawingCommentType[] | null;
  likes: DrawingLikeType[] | null;
  dislikes: DrawingDisLikeType[] | null;
  created_at: Date;
  updated_at: Date;
};

export type ProfileType = {
  id: number;
  userId: string;
  email: string;
  nickname: string;
  desc: string;
  avatar: string;
  avatarKey: string;
  cover: string;
  coverKey: string;
  role: string;
  emailToken: string | null;
  isVerified: boolean;
  exp: number;
  followers: FollowerType[];
  followings: FollowingType[];
  created_at: Date;
  updated_at: Date;
};

export type FollowerType = {
  id: number;
  from_id: number;
  to_id: number;
};

export type FollowingType = {
  id: number;
  from_id: number;
  to_id: number;
};

export type PostLikeType = {
  id: number;
  user_id: number;
  post_id: number;
};

export type PostDisLikeType = {
  id: number;
  user_id: number;
  post_id: number;
};

export type PostType = {
  id: number;
  board: 'free' | 'drawingCommission' | 'drawingRequest' | 'drawingSale';
  title: string;
  content: string;
  views: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  user: UserType;
  postComments: PostCommentType[];
  likes: PostLikeType[];
  dislikes: PostDisLikeType[];
};

export type PostCommentType = {
  id: number;
  content: string;
  user_id: number;
  post_id: number;
  created_at: Date;
  updated_at: Date;
  user: UserType;
  post: PostType;
};
