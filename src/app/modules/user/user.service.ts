/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const SignUP = async (data: any) => {
  // * Checking User Email
  const existingEmail = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingEmail) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Please use unique email this email is already exist'
    );
  }

  const { password } = data;
  const bcryptPassword = await bcrypt.hash(
    password,
    Number(config.bycrypt_salt_rounds)
  );
  data.password = bcryptPassword;
  const result = await prisma.user.create({
    data,
  });
  return result;
};

export const UserService = {
  SignUP,
};
