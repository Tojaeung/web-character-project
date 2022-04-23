import { object, string, TypeOf } from 'zod';

export const signUpSchema = object({
  body: object({
    email: string({
      required_error: '이메일을 입력해주세요.',
    }).email('이메일 형식이 아닙니다.'),
    nickname: string({
      required_error: '닉네임을 입력해주세요.',
    })
      .min(2, '최소 2글자 이상입니다.')
      .max(10, '최대 10글자 이상입니다.'),
    pw: string({
      required_error: '비밀번호를 입력해주세요.',
    }).regex(
      /^(?=.*[A-Za-z])(?=.*d)(?=.*[$@$!%*#?&])[A-Za-zd$@$!%*#?&]{8,}$/,
      '영문,숫자.특수문자 조합하여 8자리 이상'
    ),
    pwConfirmation: string({
      required_error: '비밀번호 확인을 입력해주세요.',
    }),
  }).refine((data) => data.pw === data.pwConfirmation, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['pwConfirmation'],
  }),
});

export const forgotPwSchema = object({
  body: object({
    email: string({
      required_error: '이메일을 입력하세요.',
    }).email('이메일 형식이 아닙니다.'),
  }),
});

export const verifyUserSchema = object({
  param: object({
    id: string(),
  }),
  query: object({
    emailToken: string(),
  }),
  body: object({
    email: string({
      required_error: '이메일을 입력하세요.',
    }).email('이메일 형식이 아닙니다.'),
  }),
});

export const resetPwSchema = object({
  param: object({
    id: string(),
  }),
  query: object({
    pwToken: string({
      required_error: '비밀번호 토큰이 존재하지 않습니다.',
    }),
  }),
  body: object({
    pw: string({
      required_error: '비밀번호를 입력해주세요.',
    }).regex(
      /^(?=.*[A-Za-z])(?=.*d)(?=.*[$@$!%*#?&])[A-Za-zd$@$!%*#?&]{8,}$/,
      '영문,숫자.특수문자 조합하여 8자리 이상'
    ),
    pwConfirmation: string({
      required_error: '비밀번호 확인을 입력해주세요.',
    }),
  }).refine((data) => data.pw === data.pwConfirmation, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirmation'],
  }),
});

export type SignUpInput = TypeOf<typeof signUpSchema>;
export type ForgotPwInput = TypeOf<typeof forgotPwSchema>;
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>;
export type ResetPwInput = TypeOf<typeof resetPwSchema>;
