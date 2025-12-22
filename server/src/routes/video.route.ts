import express from "express";
import videoController from "../controllers/video.controller.ts";

const router = express.Router();

router.get('/', videoController.video_index);
router.post('/', videoController.video_create);
router.get('/:id', videoController.video_details);
router.delete('/:id', videoController.video_delete);

export default router;