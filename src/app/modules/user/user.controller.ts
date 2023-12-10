import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

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

export const UserController = {
  SignUP,
};
