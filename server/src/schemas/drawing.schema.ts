import { object, z, string } from 'zod';

export const createCommentSchema = object({
  body: object({
    content: string({ required_error: '댓글을 입력해주세요.' }).max(100, '글자 수를 초과하였습니다.'),
  }),
});

export const updateCommentSchema = object({
  body: object({
    updatedContent: string({ required_error: '댓글을 입력해주세요.' }).max(100, '댓글 글자 수가 초과되었습니다.'),
  }),
});
