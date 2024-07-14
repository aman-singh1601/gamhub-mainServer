import express from "express";

import authRouter from "./auth";
import playerRouter from "./player";
import blockRouter from "./block";

const router = express.Router();


router.use("/auth", authRouter);
router.use("/player", playerRouter);
router.use("/block", blockRouter);

export default router;