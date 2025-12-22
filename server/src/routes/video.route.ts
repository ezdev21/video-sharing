import express from "express";
import { video_index, video_details, video_create, video_delete } from "../controllers/video.controller";

const router = express.Router();

router.get('/', video_index);
router.post('/', video_create);
router.get('/:id', video_details);
router.delete('/:id', video_delete);

export default router;