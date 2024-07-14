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
exports.isBlockedByUser = exports.unblockUser = exports.blockUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function blockUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, id } = req.body;
        //todo
        const isAlreadyBlocked = yield prisma.block.findFirst({
            where: {
                blockerId: userId,
                blockedId: id
            }
        });
        if (isAlreadyBlocked) {
            return res.status(200).json({
                message: "already blocked",
            });
        }
        const blocked = yield prisma.block.create({
            data: {
                blockerId: userId,
                blockedId: id
            }
        });
        res.status(200).json({
            message: "User blocked",
            isBlocked: !!blocked
        });
    });
}
exports.blockUser = blockUser;
function unblockUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.body;
        const { id } = req.params;
        const isAlreadyUnBlocked = yield prisma.block.findFirst({
            where: {
                blockerId: userId,
                blockedId: id
            }
        });
        if (!isAlreadyUnBlocked) {
            return res.status(200).json({
                message: "user already unblocked"
            });
        }
        const unblocked = yield prisma.block.delete({
            where: {
                id: isAlreadyUnBlocked.id
            }
        });
        res.status(200).json({
            message: "User unblocked",
            isBlocked: false
        });
    });
}
exports.unblockUser = unblockUser;
function isBlockedByUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.body;
        //todo
    });
}
exports.isBlockedByUser = isBlockedByUser;
