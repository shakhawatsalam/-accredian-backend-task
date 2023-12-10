"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
// * Sign Up User
const SignUpUser = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string({ required_error: 'Email Is Required' }),
        email: zod_1.z.string({ required_error: 'Email Is Required' }).email(),
        password: zod_1.z.string({ required_error: 'Password Is Required' }),
    }),
});
// * LogIn User
const logIn = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email Is Required' }).email(),
        password: zod_1.z.string({ required_error: 'Password Is Required' }),
    }),
});
exports.userValidation = {
    SignUpUser,
    logIn,
};
