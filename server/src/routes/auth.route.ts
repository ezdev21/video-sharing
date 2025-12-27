import express from "express"
import * as authController from "../controllers/auth.controller.js"

const router = express.Router()

router.post('/login', authController.login);
router.post('/register', authController.register);

export default router;