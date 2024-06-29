"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../controllers/auth");
const authMiddlewares_1 = require("../../middlewares/authMiddlewares");
const router = express_1.default.Router();
router.post("/register", auth_1.authRegister);
router.get("/getusers", authMiddlewares_1.authenticateUser, auth_1.getAllUsers);
exports.default = router;
