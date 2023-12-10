import { z } from 'zod';

// * Sign Up User
const SignUpUser = z.object({
  body: z.object({
    username: z.string({ required_error: 'Email Is Required' }),
    email: z.string({ required_error: 'Email Is Required' }).email(),
    password: z.string({ required_error: 'Password Is Required' }),
  }),
});

// * LogIn User
const logIn = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email Is Required' }).email(),
    password: z.string({ required_error: 'Password Is Required' }),
  }),
});

export const userValidation = {
  SignUpUser,
  logIn,
};
