import { object, z } from 'zod';

export const signInSchema = object({
  body: object({
    email: z.string().nonempty('이메일을 입력해주세요.').email('이메일 형식이 올바르지 않습니다.'),
    pw: z
      .string()
      .nonempty('비밀번호를 입력해주세요.')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
        '영문,숫자.특수문자 조합하여 8자리 이상'
      ),
  }),
});

export type SignInDTO = z.infer<typeof signInSchema>;
