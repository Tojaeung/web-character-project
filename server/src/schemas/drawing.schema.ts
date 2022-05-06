import { object, z } from 'zod';

export const createDrawingSchema = object({
  body: object({
    content: z.string().nonempty('내용을 입력해주세요.').max(1000, '최대 500글자 입니다.'),
  }),
});

export const createCommentSchema = object({
  params: object({
    drawingId: z.string(),
  }),
  body: object({
    content: z.string().nonempty('댓글을 입력해주세요.').max(100, '글자 수를 초과하였습니다.'),
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
    drawingId: z.string(),
  }),
  body: object({
    userId: z
      .string()
      .nonempty('그림 게시자를 확인할 수 없습니다.')
      .transform((val) => {
        const userId = Number(val);
        return userId;
      }),
  }),
});

export const createDisLikeSchema = object({
  params: object({
    drawingId: z.string(),
  }),
  body: object({
    userId: z
      .string()
      .nonempty('그림 게시자를 확인할 수 없습니다.')
      .transform((val) => {
        const userId = Number(val);
        return userId;
      }),
  }),
});

export type CreateDrawingDTO = z.infer<typeof createDrawingSchema>['body'];
export type CreateCommentDTO = z.infer<typeof createCommentSchema>;
export type UpdateCommentDTO = z.infer<typeof updateCommentSchema>;
export type CreateLikeDTO = z.infer<typeof createLikeSchema>;
export type CreateDisLikeDTO = z.infer<typeof createDisLikeSchema>;
