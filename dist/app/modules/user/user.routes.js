"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(user_validation_1.userValidation.SignUpUser), user_controller_1.UserController.SignUP);
router.post('/login', (0, validateRequest_1.default)(user_validation_1.userValidation.logIn), user_controller_1.UserController.loginUser);
router.get('/:id', user_controller_1.UserController.getSingleUser);
exports.userRoutes = router;
