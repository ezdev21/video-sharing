import express from "express";
import * as videoController from "../controllers/video.controller.js";

const router = express.Router();

router.get('/', videoController.videoIndex);
router.post('/', videoController.videoCreate);
router.get('/search', videoController.videoSearch);
router.get('/:id', videoController.videoDetails);
router.put('/:id', videoController.videoUpdate);
router.delete('/:id', videoController.videoDelete);
router.get('/:id/recommended', videoController.videoRecommended);
router.get('/:id/channel', videoController.videoByChannel);

export default router;
