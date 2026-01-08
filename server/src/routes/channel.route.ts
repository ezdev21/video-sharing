import express from "express";
import * as channelController from "../controllers/channel.controller.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.get('/', channelController.channelIndex);
router.post('/',
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "background", maxCount: 1 },
  ]),
  channelController.channelCreate);
router.get('/follow',channelController.channelFollowing);
router.post('/follow',channelController.channelFollow);  
router.get('/:id', channelController.channelDetails);
router.put('/:id', channelController.channelUpdate);
router.delete('/:id', channelController.channelDelete);
router.get('/:id/videos', channelController.channelVideos);
router.get('/:id/posts', channelController.channelPosts);
router.get('/:id/playlists', channelController.channelPlaylists);

export default router;