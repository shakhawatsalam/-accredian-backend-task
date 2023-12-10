import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(userValidation.SignUpUser),
  UserController.SignUP
);
router.post(
  '/login',
  validateRequest(userValidation.logIn),
  UserController.loginUser
);
router.get(
  '/:id',
  UserController.getSingleUser
);

export const userRoutes = router;
