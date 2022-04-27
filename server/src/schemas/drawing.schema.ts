import { object, z, string } from 'zod';

export const createDrawingSchema = object({
  body: object({
    newDrawing: string({
      required_error: '업로드할 그림을 선택하지 않았습니다.',
    }),
    content: string({
      required_error: '그림 내용을 입력해주세요.',
    })
      .max(10000, '최대 5000자 이상입니다.')
      .refine((val) => val === '<p><br></p>', { message: '그림 내용을 입력해주세요.', path: ['content'] }),
  }),
});

export const getDrawingsSchema = object({
  query: object({
    cursor: string(),
  }),
});

export const deleteDrawingSchema = object({
  params: object({
    drawingId: string(),
  }),
});

export const incrementViewSchema = object({
  params: object({
    drawingId: string(),
  }),
});

export const createCommentSchema = object({
  params: object({
    drawingId: string(),
  }),
  body: object({
    content: string({ required_error: '댓글을 입력해주세요.' }).max(100, '글자 수를 초과하였습니다.'),
  }),
});

export const updateCommentSchema = object({
  params: object({
    commentId: string(),
  }),
  body: object({
    content: string({ required_error: '댓글을 입력해주세요.' }).max(100, '댓글 글자 수가 초과되었습니다.'),
  }),
});

export const deleteCommentSchema = object({
  params: object({
    commentId: string(),
  }),
});

export const createLikeSchema = object({
  params: object({
    drawingId: string(),
  }),
});

export const createDisLikeSchema = object({
  params: object({
    drawingId: string(),
  }),
});

export type createDrawingInput = z.infer<typeof createDrawingSchema>;
export type getDrawingsInput = z.infer<typeof getDrawingsSchema>;
export type deleteDrawingInput = z.infer<typeof deleteDrawingSchema>;
export type incrementViewInput = z.infer<typeof incrementViewSchema>;

export type createCommentInput = z.infer<typeof createCommentSchema>;
export type updateCommentInput = z.infer<typeof updateCommentSchema>;
export type deleteCommentInput = z.infer<typeof deleteCommentSchema>;

export type createLikeInput = z.infer<typeof createLikeSchema>;
export type createDisLikeInput = z.infer<typeof createDisLikeSchema>;
