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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.authRegister = void 0;
require("dotenv/config");
const client_1 = require("@prisma/client");
const jwtHandler_1 = require("../../api/auth/jwtHandler");
const prisma = new client_1.PrismaClient();
function authRegister(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { number } = req.body;
        try {
            const isRegistered = yield prisma.user.findUnique({
                where: {
                    phone_number: number
                }
            });
            if (isRegistered) {
                res.status(200).json({
                    "meaage": "User already registered. Please try login in!",
                });
            }
            const user = yield prisma.user.create({
                data: {
                    phone_number: number,
                }
            });
            const token = (0, jwtHandler_1.generateToken)(user);
            res.status(200).json({
                "message": "Login Successfull",
                user,
                token
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                message: "interval server error",
                error
            });
        }
    });
}
exports.authRegister = authRegister;
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.body;
        const users = yield prisma.user.findMany({
            where: {
                NOT: {
                    id: userId
                }
            }
        });
        res.status(200).json({
            "message": "wokring on it",
            users
        });
    });
}
exports.getAllUsers = getAllUsers;
