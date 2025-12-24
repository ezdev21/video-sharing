import express from "express";
import * as userController from "../controllers/user.controller.js";

const router = express.Router();

router.get('/', userController.userIndex);
router.post('/', userController.userCreate);
router.get('/:id', userController.userDetails);
router.put('/:id', userController.userUpdate);
router.delete('/:id', userController.userDelete);

export default router;