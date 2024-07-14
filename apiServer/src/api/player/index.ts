import express from "express";


import { followPlayer, getPlayerProfile, unfollowPlayer } from "../../controllers/player";
import { authenticateUser } from "../../middlewares/authMiddlewares";

const router = express.Router();

router.get("/:id", getPlayerProfile);
router.post("/follow", authenticateUser, followPlayer);
router.post("/unfollow", authenticateUser, unfollowPlayer);


export default router;