import express from "express";
import commentController from "../controllers/comment.controller.ts";

const router = express.Router();

router.get('/', commentController.comment_index);
router.post('/', commentController.comment_create);
router.get('/:id', commentController.comment_details);
router.delete('/:id', commentController.comment_delete);

export default router;