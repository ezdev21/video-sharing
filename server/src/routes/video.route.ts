import express from "express";
import { videoIndex, videoDetails, videoCreate, videoUpdate, videoDelete } from "../controllers/video.controller";

const router = express.Router();

router.get('/', videoIndex);
router.post('/', videoCreate);
router.get('/:id', videoDetails);
router.put('/:id', videoUpdate);
router.delete('/:id', videoDelete);

export default router;