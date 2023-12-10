import { z } from 'zod';
const SignUpUser = z.object({
  body: z.object({
    username: z.string({ required_error: 'Email Is Required' }),
    email: z.string({ required_error: 'Email Is Required' }).email(),
    password: z.string({ required_error: 'Password Is Required' }),
  }),
});

export const userValidation = {
  SignUpUser,
};
