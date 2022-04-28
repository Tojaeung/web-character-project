import { object, z, string } from 'zod';

export const signUpSchema = object({
  body: object({
    email: string({
      required_error: '이메일을 입력해주세요.',
    }).email('이메일 형식이 아닙니다.'),
    nickname: string({
      required_error: '닉네임을 입력해주세요.',
    })
      .min(2, '최소 2글자 이상입니다.')
      .max(10, '최대 10글자 이상입니다.')
      .regex(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/, '영어,한글,숫자를 조합할 수 있습니다.'),
    pw: string({
      required_error: '비밀번호를 입력해주세요.',
    }).regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
      '영문,숫자.특수문자 조합하여 8자리 이상'
    ),
    pwConfirmation: string({
      required_error: '비밀번호 확인을 입력해주세요.',
    }),
  }).refine((val) => val.pw === val.pwConfirmation, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['pwConfirmation'],
  }),
});

export const verifyUserSchema = object({
  query: object({
    emailToken: string(),
  }),
});

export const forgotPwSchema = object({
  body: object({
    email: string({
      required_error: '이메일을 입력하세요.',
    }).email('이메일 형식이 아닙니다.'),
  }),
});

export const resetPwSchema = object({
  query: object({
    pwToken: string({
      required_error: '비밀번호 토큰이 존재하지 않습니다.',
    }),
  }),

  body: object({
    updatedPw: string({
      required_error: '비밀번호를 입력해주세요.',
    }).regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
      '영문,숫자,특수문자 조합하여 8자리 이상'
    ),
    updatedPwConfirmation: string({
      required_error: '비밀번호 확인을 입력해주세요.',
    }),
  }).refine((val) => val.updatedPw === val.updatedPwConfirmation, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirmation'],
  }),
});

export const getUserSchema = object({
  params: object({
    userId: string(),
  }),
});

export const verifyEmailSchema = object({
  body: object({
    updatedEmail: string({
      required_error: '이메일을 입력해주세요.',
    }).email('이메일 형식이 아닙니다.'),
  }),
});

export const updateEmailSchema = object({
  params: object({
    userId: string(),
  }),
  query: object({
    updatedEmail: string(),
  }),
});

export const updateNicknameSchema = object({
  body: object({
    updatedNickname: string({
      required_error: '닉네임을 입력해주세요.',
    })
      .min(2, '최소 2글자 이상입니다.')
      .max(10, '최대 10글자 이상입니다.')
      .regex(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/, '영어,한글,숫자를 조합할 수 있습니다.'),
  }),
});

export const updatePwSchema = object({
  body: object({
    currentPw: string({
      required_error: '현재 비밀번호를 입력해주세요.',
    }).regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
      '영문,숫자.특수문자 조합하여 8자리 이상'
    ),
    updatedPw: string({
      required_error: '새로운 비밀번호를 입력해주세요.',
    }).regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
      '영문,숫자.특수문자 조합하여 8자리 이상'
    ),
    updatedPwConfirmation: string({
      required_error: '비밀번호 확인을 입력해주세요.',
    }),
  }).refine((val) => val.updatedPw === val.updatedPwConfirmation, {
    message: '새로운 비밀번호가 일치하지 않습니다.',
    path: ['newPwConfirmation'],
  }),
});

export const updateDescSchema = object({
  body: object({
    updatedDesc: string({
      required_error: '자기소개를 입력해주세요.',
    }).max(5000, '자기소개 글자를 초과하였습니다.'),
  }),
});

export const updateAvatarSchema = object({
  body: object({
    updatedAvatar: string({
      required_error: '변경할 프로필사진을 업로드 하지 않았습니다.',
    }),
  }),
});

export const updateDefaultAvatarSchema = object({});

export const updateCoverSchema = object({
  body: object({
    updatedCover: string({
      required_error: '변경할 커버사진을 업로드 하지 않았습니다.',
    }),
  }),
});

export const updateDefaultCoverSchema = object({});

export const deleteAccountSchema = object({});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type VerifyUserInput = z.infer<typeof verifyUserSchema>;
export type ForgotPwInput = z.infer<typeof forgotPwSchema>;
export type ResetPwInput = z.infer<typeof resetPwSchema>;

export type GetUserInput = z.infer<typeof getUserSchema>;

export type verifyEmailInput = z.infer<typeof verifyEmailSchema>;
export type updateEmailInput = z.infer<typeof updateEmailSchema>;
export type updateNicknameInput = z.infer<typeof updateNicknameSchema>;
export type updatePwInput = z.infer<typeof updatePwSchema>;
export type updateDescInput = z.infer<typeof updateDescSchema>;

export type updateAvatarInput = z.infer<typeof updateAvatarSchema>;
export type updateDefaultAvatarInput = z.infer<typeof updateDefaultAvatarSchema>;
export type updateCoverInput = z.infer<typeof updateCoverSchema>;
export type updateDefaultCoverInput = z.infer<typeof updateDefaultCoverSchema>;

export type deleteAccountInput = z.infer<typeof deleteAccountSchema>;
