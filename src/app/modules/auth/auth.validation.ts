import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'ID is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});
const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'refreshToken is required',
    }),
  }),
});

const changePasswordSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'old Password is required',
    }),
    newPassword: z.string({
      required_error: 'new Password is required',
    }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  refreshTokenValidationSchema,
  changePasswordSchema,
};
