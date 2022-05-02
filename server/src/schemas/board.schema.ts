import { array, object, string } from 'zod';

export const removeImageKeySchema = object({
  body: object({
    imageKeys: array(string()).default([]),
  }),
});

export const createPostSchema = object({
  body: object({
    title: string({ required_error: '제목을 입력해주세요.' }).max(50, '제목은 최대 50글자 입니다.'),
    content: string({ required_error: '내용을 입력해주세요.' }).max(10000, '내용의 글자 수가 초과되었습니다.'),
    imageKeys: array(string()),
  }),
});

export const updatePostSchema = object({
  body: object({
    title: string({ required_error: '제목을 입력해주세요.' }).max(50, '제목은 최대 50글자 입니다.'),
    content: string({ required_error: '내용을 입력해주세요.' }).max(10000, '내용의 글자 수가 초과되었습니다.'),
    imageKeys: array(string()).default([]),
  }),
});

export const createCommentSchema = object({
  body: object({
    content: string({ required_error: '댓글을 입력해주세요.' }).max(100, '댓글 글자 수가 초과되었습니다.'),
  }),
});

export const updateCommentSchema = object({
  body: object({
    updatedContent: string({ required_error: '댓글을 입력해주세요.' }).max(100, '댓글 글자 수가 초과되었습니다.'),
  }),
});
