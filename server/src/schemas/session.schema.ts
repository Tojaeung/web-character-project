import { object, string, TypeOf } from 'zod';

export const signInSchema = object({
  body: object({
    email: string({
      required_error: '이메일을 입력하세요.',
    }),
    pw: string({
      required_error: '비밀번호를 입력하세요',
    }),
  }),
});

export type SignInInput = TypeOf<typeof signInSchema>;
