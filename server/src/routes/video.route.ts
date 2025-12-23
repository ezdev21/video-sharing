import express from "express";
import * as videoController from "../controllers/video.controller";

const router = express.Router();

router.get('/', videoController.videoIndex);
router.post('/', videoController.videoCreate);
router.get('/:id', videoController.videoDetails);
router.put('/:id', videoController.videoUpdate);
router.delete('/:id', videoController.videoDelete);

export default router;