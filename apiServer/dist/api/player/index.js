"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const player_1 = require("../../controllers/player");
const authMiddlewares_1 = require("../../middlewares/authMiddlewares");
const router = express_1.default.Router();
router.get("/:id", player_1.getPlayerProfile);
router.post("/follow", authMiddlewares_1.authenticateUser, player_1.followPlayer);
router.post("/unfollow", authMiddlewares_1.authenticateUser, player_1.unfollowPlayer);
exports.default = router;
