import express from "express";

import { authRegister, getAllUsers } from "../../controllers/auth";
import { authenticateUser } from "../../middlewares/authMiddlewares";


const router = express.Router();

router.post("/register", authRegister);
router.get("/getusers", authenticateUser, getAllUsers);


export default router;