"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stream_1 = require("../../controllers/stream");
const router = express_1.default.Router();
// router.get("/:id", getPlayerProfile);
router.get("/", stream_1.generateStream);
exports.default = router;
