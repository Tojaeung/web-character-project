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
  drawings?: DrawingType[];
  drawingComments?: DrawingCommentType[];
  posts?: PostType[];
  postComments?: PostCommentType[];
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
  user?: UserType;
  drawing?: DrawingType;
};

export type DrawingLikeType = {
  id: number;
  userId: number; // 좋아요 누른 사람 id
  drawing_id: number;
  drawing?: DrawingType;
};

export type DrawingDisLikeType = {
  id: number;
  userId: number; // 싫어요 누른 사람 id
  drawing_id: number;
  drawing?: DrawingType;
};

export type PostType = {
  id: number;
  title: string;
  content: string;
  views: number;
  user_id: number;
  board_id: number;
  created_at: Date;
  updated_at: Date;
  user?: UserType;
  board?: BoardType;
  comments?: PostCommentType[];
  likes?: PostLikeType[];
  dislikes?: PostDisLikeType[];
};

export type PostCommentType = {
  id: number;
  content: string;
  user_id: number;
  board_id: number;
  post_id: number;
  created_at: Date;
  updated_at: Date;
  user?: UserType;
  board?: BoardType;
  post?: PostType;
};

export type BoardType = {
  id: number;
  enName: string;
  krName: string;
  created_at: Date;
  updated_at: Date;
  posts?: PostType[];
  comments?: PostCommentType[];
};

export type PostLikeType = {
  id: number;
  userId: number;
  post_id: number;
  post?: PostType;
};

export type PostDisLikeType = {
  id: number;
  userId: number;
  post_id: number;
  post?: PostType;
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

export type NotificationType = {
  id: number;
  type: 'comment' | 'like' | 'penalty';
  content: string;
  userId: number;
  boardName: string;
  postId?: number;
  is_confirmed: boolean;
  created_at: Date;
  updated_at: Date;
};
