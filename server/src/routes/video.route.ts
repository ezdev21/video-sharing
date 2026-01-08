import express from "express";
import * as videoController from "../controllers/video.controller.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.get('/', videoController.videoIndex);
router.post('/',
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  videoController.videoCreate);
router.get('/search', videoController.videoSearch);
router.get('/react', videoController.VideoReacts);
router.post('/react', videoController.videoReact);
router.get('/user-reaction', videoController.userReaction);
router.get('/:id', videoController.videoDetails);
router.put('/:id', videoController.videoUpdate);
router.delete('/:id', videoController.videoDelete);
router.get('/:id/recommended', videoController.videoRecommended);
router.get('/:id/channel', videoController.videoByChannel);

export default router;
