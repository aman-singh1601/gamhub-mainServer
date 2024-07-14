import express from "express";

import { authenticateUser } from "../../middlewares/authMiddlewares";
import { generateStream } from "../../controllers/stream";

const router = express.Router();

// router.get("/:id", getPlayerProfile);
router.get("/", generateStream);


export default router;