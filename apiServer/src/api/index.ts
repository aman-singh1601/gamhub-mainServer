import express from "express";

import authRouter from "./auth";
import playerRouter from "./player";
import blockRouter from "./block";
import streamRouter from "./stream";

const router = express.Router();


router.use("/auth", authRouter);
router.use("/player", playerRouter);
router.use("/block", blockRouter);
router.use("/stream", streamRouter);

export default router;