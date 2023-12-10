import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

// * Sign Up User
const SignUP = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body, 'Regisesad');
  const result = await UserService.SignUP(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Created Successfully',
    data: result,
  });
});
// * Login User
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await UserService.loginUser(loginData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User LogIn Successfully',
    data: result,
  });
});
// * Login User
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getSingleUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User LogIn Successfully',
    data: result,
  });
});

export const UserController = {
  SignUP,
  loginUser,
  getSingleUser,
};
