interface PhotoTagType {
  id: number;
  tag: string;
  photo_id: number;
}
interface CommentType {
  id: number;
  comment: string;
  user_id: number;
  photo_id: number;
  createAt: Date;
  user: UserType;
}

interface UserType {
  id: number;
  nickname: string;
  level: number;
  avatar: string;
}

export type PhotoType = {
  id: number;
  title: string;
  content: string;
  url: string;
  key: string;
  user_id: number;
  createdAt: Date;
  updatedAt: Date;
  photoTags: PhotoTagType;
  comments: CommentType;
};
export type getPhotoReturnType = {
  ok: boolean;
  photos: PhotoType[] | undefined;
  message: string | undefined;
  newCursor: number;
};

export type getPhotoParamType = {
  profileId: string | undefined;
  cursor: number | null;
};

export type getPhotoErrorType = {
  ok: boolean;
  message: string;
};
