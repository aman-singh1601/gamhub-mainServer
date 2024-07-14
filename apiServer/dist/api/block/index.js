"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddlewares_1 = require("../../middlewares/authMiddlewares");
const block_1 = require("../../controllers/block");
const router = express_1.default.Router();
router.post("/", authMiddlewares_1.authenticateUser, block_1.blockUser);
router.delete("/:id", authMiddlewares_1.authenticateUser, block_1.unblockUser);
router.get("/:id", authMiddlewares_1.authenticateUser, block_1.isBlockedByUser);
exports.default = router;
