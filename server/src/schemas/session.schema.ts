import { object, string, TypeOf } from 'zod';

export const signInSchema = object({
  body: object({
    email: string({
      required_error: '이메일을 입력하세요.',
    }).email('이메일 형식이 올바르지 않습니다.'),
    pw: string({
      required_error: '비밀번호를 입력하세요',
    }).regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
      '영문,숫자.특수문자 조합하여 8자리 이상'
    ),
  }),
});

export type SignInInput = TypeOf<typeof signInSchema>;
