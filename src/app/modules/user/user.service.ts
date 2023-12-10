/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
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

// * Login User
const loginUser = async (payload: any): Promise<string> => {
  const { email, password } = payload;
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found');
  }
  const checkPassword = await bcrypt.compare(password, isUserExist.password);
  console.log(checkPassword);
  if (!checkPassword) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Email address or password not valid'
    );
  }
  // create assess token
  const { id: userId } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return accessToken;
};

export const UserService = {
  SignUP,
  loginUser,
};
