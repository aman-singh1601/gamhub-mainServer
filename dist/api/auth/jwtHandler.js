"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const generateToken = (user) => {
    if (!process.env.SECRET_KEY) {
        throw new Error('SECRET_KEY is not defined in the environment variables');
    }
    return jsonwebtoken_1.default.sign({ id: user.id, phone_number: user.phone_number }, process.env.SECRET_KEY, {
        expiresIn: '3h'
    });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    if (!process.env.SECRET_KEY) {
        throw new Error('SECRET_KEY is not defined in the environment variables');
    }
    return jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
};
exports.verifyToken = verifyToken;
