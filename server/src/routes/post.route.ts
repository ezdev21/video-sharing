import express from "express";
import { postIndex, postDetails, postCreate, postUpdate, postDelete } from "../controllers/post.controller";
import e from "express";

const router = express.Router();

router.get('/', postIndex);
router.post('/', postCreate);
router.get('/:id', postDetails);
router.put('/:id', postUpdate);
router.delete('/:id', postDelete);

export default router;