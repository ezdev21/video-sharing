import express from "express"
import * as authController from "../controllers/auth.controller.js"
import rateLimit from "express-rate-limit";

const router = express.Router()

const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Too many login attempts. Try again later.",
});

router.post('/login', loginLimiter, authController.login);
router.post('/register', authController.register);

export default router;