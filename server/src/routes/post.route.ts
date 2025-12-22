import express from "express";
import postController from "../controllers/post.controller.ts";
import e from "express";

const router = express.Router();

router.get('/', postController.post_index);
router.post('/', postController.post_create);
router.get('/:id', postController.post_details);
router.delete('/:id', postController.post_delete);

export default router;