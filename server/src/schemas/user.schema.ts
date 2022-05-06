import { object, z } from 'zod';

export const signUpSchema = object({
  body: object({
    email: z.string().nonempty('이메일을 입력해주세요.').email('이메일 형식이 아닙니다.'),
    nickname: z
      .string()
      .min(2, '최소 2글자 이상입니다.')
      .max(10, '최대 10글자 이상입니다.')
      .regex(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/, '영어,한글,숫자를 조합할 수 있습니다.'),
    pw: z
      .string()
      .nonempty('비밀번호를 입력해주세요.')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
        '영문,숫자.특수문자 조합하여 8자리 이상'
      ),
    pwConfirmation: z.string().nonempty('비밀번호 확인을 입력해주세요.'),
  }).refine((val) => val.pw === val.pwConfirmation, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['pwConfirmation'],
  }),
});

export const forgotPwSchema = object({
  body: object({
    email: z.string().nonempty('이메일을 입력해주세요.').email('이메일 형식이 아닙니다.'),
  }),
});

export const resetPwSchema = object({
  body: object({
    updatedPw: z
      .string()
      .nonempty('새로운 비밀번호를 입력해주세요.')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
        '영문,숫자,특수문자 조합하여 8자리 이상'
      ),
    updatedPwConfirmation: z.string().nonempty('비밀번호 확인를 입력해주세요.'),
  }).refine((val) => val.updatedPw === val.updatedPwConfirmation, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirmation'],
  }),
});

export const verifyEmailSchema = object({
  body: object({
    updatedEmail: z.string().nonempty('이메일을 입력해주세요.').email('이메일 형식이 아닙니다.'),
  }),
});

export const updateNicknameSchema = object({
  body: object({
    updatedNickname: z
      .string()
      .nonempty('닉네임을 입력해주세요.')
      .min(2, '최소 2글자 이상입니다.')
      .max(10, '최대 10글자 이상입니다.')
      .regex(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/, '영어,한글,숫자를 조합할 수 있습니다.'),
  }),
});

export const updatePwSchema = object({
  body: object({
    currentPw: z
      .string()
      .nonempty('현재 비밀번호를 입력해주세요.')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
        '영문,숫자.특수문자 조합하여 8자리 이상'
      ),
    updatedPw: z
      .string()
      .nonempty('변경할 비밀번호를 입력해주세요.')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
        '영문,숫자.특수문자 조합하여 8자리 이상'
      ),
    updatedPwConfirmation: z.string().nonempty('비밀번호 확인을 입력해주세요.'),
  }).refine((val) => val.updatedPw === val.updatedPwConfirmation, {
    message: '새로운 비밀번호가 일치하지 않습니다.',
    path: ['newPwConfirmation'],
  }),
});

export const updateDescSchema = object({
  body: object({
    updatedDesc: z.string().nonempty('자기소개를 입력해주세요.').max(1000, '자기소개 글자를 초과하였습니다.'),
  }),
});

export const sendReportSchema = object({
  params: object({
    userId: z.string(),
  }),
  body: object({
    reportType: z.string().nonempty('신고유형을 선택해주세요.'),
    report: z.string().nonempty('신고내용을 작성해주세요.').max(1000, '자기소개 글자를 초과하였습니다.'),
    url: z
      .string()
      .nonempty('신고위치를 확인할 수 없습니다.')
      .url({ message: '신고위치의 url형식이 유효하지 않습니다.' }),
  }),
});

export const getUserInfoSchema = object({
  params: object({
    userId: z.string(),
  }),
});

export const givePenaltySchema = object({
  params: object({
    userId: z.string(),
  }),
  body: object({
    penaltyPeriod: z.number({
      required_error: '제재기한을 입력해주세요.',
      invalid_type_error: '오직 숫자만 입력 가능합니다.',
    }),
  }),
});

export type SignUpDTO = z.infer<typeof signUpSchema>['body'];
export type ForgotPwDTO = z.infer<typeof forgotPwSchema>['body'];
export type ResetPwDTO = z.infer<typeof resetPwSchema>['body'];
export type VerifyEmailDTO = z.infer<typeof verifyEmailSchema>['body'];
export type UpdateNicknameDTO = z.infer<typeof updateNicknameSchema>['body'];
export type UpdatePwDTO = z.infer<typeof updatePwSchema>['body'];
export type UpdateDescDTO = z.infer<typeof updateDescSchema>['body'];
export type SendReportDTO = z.infer<typeof sendReportSchema>;
export type GetUserInfoDTO = z.infer<typeof getUserInfoSchema>['params'];
export type GivePenaltyDTO = z.infer<typeof givePenaltySchema>;
