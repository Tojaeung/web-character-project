import { object, z } from 'zod';

export const removeImageKeySchema = object({
  body: object({
    imageKeys: z.array(z.string()),
  }),
});

export const createPostSchema = object({
  params: object({
    board: z.string(),
  }),
  body: object({
    title: z.string().nonempty('제목을 입력해주세요.').max(50, '제목은 최대 50글자 입니다.'),
    content: z.string().nonempty('내용을 입력해주세요.').max(2000, '내용의 글자 수가 초과되었습니다.'),
    imageKeys: z.array(z.string()),
  }),
});

export const updatePostSchema = object({
  params: object({
    postId: z.string(),
  }),
  body: object({
    title: z.string().nonempty('제목을 입력해주세요.').max(50, '제목은 최대 50글자 입니다.'),
    content: z.string().nonempty('내용을 입력해주세요.').max(2000, '내용의 글자 수가 초과되었습니다.'),
    imageKeys: z.array(z.string()).default([]),
  }),
});

export const createCommentSchema = object({
  params: object({
    board: z.string(),
    postId: z.string(),
  }),
  body: object({
    content: z.string().nonempty('댓글을 입력해주세요.').max(100, '댓글 글자 수가 초과되었습니다.'),
  }),
});

export const updateCommentSchema = object({
  params: object({
    commentId: z.string(),
  }),
  body: object({
    updatedContent: z.string().nonempty('댓글을 수정해주세요.').max(100, '댓글 글자 수가 초과되었습니다.'),
  }),
});

export const createLikeSchema = object({
  params: object({
    postId: z.string(),
  }),
  body: object({
    userId: z.number(),
  }),
});

export const createDisLikeSchema = object({
  params: object({
    postId: z.string(),
  }),
  body: object({
    userId: z.number(),
  }),
});

export type RemoveImageKeyDTO = z.infer<typeof removeImageKeySchema>;
export type CreatePostDTO = z.infer<typeof createPostSchema>;
export type UpdatePostDTO = z.infer<typeof updatePostSchema>;
export type CreateCommentDTO = z.infer<typeof createCommentSchema>;
export type UpdateCommentDTO = z.infer<typeof updateCommentSchema>;
export type CreateLikeDTO = z.infer<typeof createLikeSchema>;
export type CreateDisLikeDTO = z.infer<typeof createDisLikeSchema>;
