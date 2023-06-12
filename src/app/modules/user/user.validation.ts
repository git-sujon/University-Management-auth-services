import { z } from 'zod';

const createUserSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'Role is Required',
    }),
    password: z.string().optional(),
  }),
});

export const userValidation = {
  createUserSchema,
};
