import express from "express";
import { commentIndex, commentDetails, commentCreate, commentUpdate, commentDelete } from "../controllers/comment.controller";

const router = express.Router();

router.get('/', commentIndex);
router.post('/', commentCreate);
router.get('/:id', commentDetails);
router.put('/:id', commentUpdate);
router.delete('/:id', commentDelete);

export default router;