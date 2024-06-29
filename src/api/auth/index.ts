import express from "express";

import { authRegister, getAllUsers, getFollowing } from "../../controllers/auth";
import { authenticateUser } from "../../middlewares/authMiddlewares";


const router = express.Router();

router.post("/register", authRegister);
router.get("/getusers", authenticateUser, getAllUsers);
router.get("/getfollowing", authenticateUser, getFollowing);


export default router;