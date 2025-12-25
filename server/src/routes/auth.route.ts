import express from "express"
import * as authController from "../controllers/auth.controller.js"
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/login', authMiddleware, authController.login);
router.post('/register', authMiddleware, authController.register);

export default router;