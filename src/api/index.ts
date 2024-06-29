import express from "express";

import authRouter from "./auth";
import playerRouter from "./player";

const router = express.Router();


router.use("/auth", authRouter);
router.use("/player", playerRouter);

export default router;