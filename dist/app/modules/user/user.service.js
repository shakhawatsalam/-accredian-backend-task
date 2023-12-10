"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const SignUP = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // * Checking User Email
    const existingEmail = yield prisma_1.default.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (existingEmail) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Please use unique email this email is already exist');
    }
    const { password } = data;
    const bcryptPassword = yield bcrypt_1.default.hash(password, Number(config_1.default.bycrypt_salt_rounds));
    data.password = bcryptPassword;
    const result = yield prisma_1.default.user.create({
        data,
    });
    return result;
});
// * Login User
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            email: email,
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User Not Found');
    }
    const checkPassword = yield bcrypt_1.default.compare(password, isUserExist.password);
    console.log(checkPassword);
    if (!checkPassword) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Email address or password not valid');
    }
    // create assess token
    const { id: userId } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, email }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return accessToken;
});
// * get Single user
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: {
            id,
        },
    });
    return result;
});
exports.UserService = {
    SignUP,
    loginUser,
    getSingleUser,
};
