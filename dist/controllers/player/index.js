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
exports.unfollowPlayer = exports.followPlayer = exports.getPlayerProfile = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getPlayerProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { userId } = req.body;
            let player = yield prisma.user.findUnique({
                where: {
                    id
                }
            });
            const isFollowing = yield prisma.follow.findFirst({
                where: {
                    followerId: userId,
                    followingId: id
                }
            });
            res.status(200).json({
                message: "Player Followed",
                player,
                isFollowing: !!isFollowing
            });
        }
        catch (error) {
            res.status(500).json({
                message: "Internal server error"
            });
        }
    });
}
exports.getPlayerProfile = getPlayerProfile;
function followPlayer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, userId } = req.body;
            const followData = yield prisma.follow.create({
                data: {
                    followerId: userId,
                    followingId: id
                }
            });
            res.status(200).json({
                message: "Player Followed",
                isFollowing: true
            });
        }
        catch (error) {
            res.status(500).json({
                message: "Internal server error",
                error
            });
        }
    });
}
exports.followPlayer = followPlayer;
function unfollowPlayer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, userId } = req.body;
            const isFollowing = yield prisma.follow.findFirst({
                where: {
                    followerId: userId,
                    followingId: id
                }
            });
            const unfollowedData = yield prisma.follow.delete({
                where: {
                    id: isFollowing.id
                }
            });
            return res.status(200).json({
                message: "Player Unfollowed",
                isFollowing: false
            });
        }
        catch (error) {
            res.status(500).json({
                message: "Internal server error"
            });
        }
    });
}
exports.unfollowPlayer = unfollowPlayer;
