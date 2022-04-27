import { array, object, z, string, number } from 'zod';

export const getBoardSchema = object({
  params: object({
    board: string(),
  }),
  query: object({
    page: number(),
    limit: number(),
  }),
});

export const getPostSchema = object({
  params: object({
    board: string(),
    id: string(),
  }),
});

export const createImageKeySchema = object({
  body: object({
    newImage: string(),
  }),
});

export const deleteImageKeySchema = object({
  body: object({
    imageKeys: array(string()),
  }),
});

export const createPostSchema = object({
  params: object({
    board: string(),
  }),
  body: object({
    title: string({ required_error: '제목을 입력해주세요.' }).max(50, '제목은 최대 50글자 입니다.'),
    content: string({ required_error: '내용을 입력해주세요.' }).max(10000, '내용의 글자 수가 초과되었습니다.'),
    imageKeys: array(string()),
  }),
});

export const updatePostSchema = object({
  params: object({
    board: string(),
    postId: string(),
  }),
  body: object({
    title: string({ required_error: '제목을 입력해주세요.' }).max(50, '제목은 최대 50글자 입니다.'),
    content: string({ required_error: '내용을 입력해주세요.' }).max(10000, '내용의 글자 수가 초과되었습니다.'),
    imageKeys: array(string()),
  }),
});

export const deletePostSchema = object({
  params: object({
    board: string(),
    postId: string(),
  }),
});

export const createCommentSchema = object({
  params: object({
    board: string(),
    postId: string(),
  }),
  body: object({
    content: string({ required_error: '댓글을 입력해주세요.' }).max(100, '댓글 글자 수가 초과되었습니다.'),
  }),
});

export const updateCommentSchema = object({
  params: object({
    board: string(),
    commentId: string(),
  }),
  body: object({
    content: string({ required_error: '댓글을 입력해주세요.' }).max(100, '댓글 글자 수가 초과되었습니다.'),
  }),
});

export const deleteCommentSchema = object({
  params: object({
    board: string(),
    commentId: string(),
  }),
});

export const createLikeSchema = object({
  params: object({
    board: string(),
    postId: string(),
  }),
});

export const createDisLikeSchema = object({
  params: object({
    board: string(),
    postId: string(),
  }),
});

export type GetBoardInput = z.infer<typeof getBoardSchema>;
export type GetPostInput = z.infer<typeof getPostSchema>;

export type CreateImageKeyInput = z.infer<typeof createImageKeySchema>;
export type DeleteImageKeyInput = z.infer<typeof deleteImageKeySchema>;

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
export type DeletePostInput = z.infer<typeof deletePostSchema>;

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type UpdateCommentInput = z.infer<typeof updateCommentSchema>;
export type DeleteCommentInput = z.infer<typeof deleteCommentSchema>;

export type CreateLikeInput = z.infer<typeof createLikeSchema>;
export type CreateDisLikeInput = z.infer<typeof createDisLikeSchema>;
