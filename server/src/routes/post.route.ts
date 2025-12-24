import express from "express";
import * as postController from "../controllers/post.controller.js";

const router = express.Router();

router.get('/', postController.postIndex);
router.post('/', postController.postCreate);
router.get('/:id', postController.postDetails);
router.put('/:id', postController.postUpdate);
router.delete('/:id', postController.postDelete);

export default router;