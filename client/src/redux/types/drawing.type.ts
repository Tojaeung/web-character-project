interface TagType {
  id: number;
  tag: string;
  drawing_id: number;
}
interface CommentType {
  id: number;
  comment: string;
  user_id: number;
  drawing_id: number;
  createAt: Date;
}

export type DrawingType = {
  id: number;
  title: string;
  content: string;
  url: string;
  key: string;
  user_id: number;
  createdAt: Date;
  updatedAt: Date;
  Tags: TagType[];
  comments: CommentType[];
};

export type getDrawingReturnType = {
  ok: boolean;
  drawings: DrawingType[] | undefined;
  message: string | undefined;
  newCursor: number;
};

export type getDrawingParamType = {
  profileId: number | undefined;
  cursor: number | null;
};

export type getDrawingErrorType = {
  ok: boolean;
  message: string;
};
