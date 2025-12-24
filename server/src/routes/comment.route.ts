import express from "express";
import * as commentController from "../controllers/comment.controller.js";

const router = express.Router();

router.get('/', commentController.commentIndex);
router.post('/', commentController.commentCreate);
router.get('/:id', commentController.commentDetails);
router.put('/:id', commentController.commentUpdate);
router.delete('/:id', commentController.commentDelete);

export default router;