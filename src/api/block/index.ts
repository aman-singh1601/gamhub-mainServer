import express from "express";



import { authenticateUser } from "../../middlewares/authMiddlewares";
import { blockUser, isBlockedByUser, unblockUser } from "../../controllers/block";

const router = express.Router();


router.post("/", authenticateUser, blockUser);
router.delete("/:id", authenticateUser, unblockUser);
router.get("/:id", authenticateUser, isBlockedByUser);

export default router;