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
router.get('/:id', channelController.channelDetails);
router.put('/:id', channelController.channelUpdate);
router.delete('/:id', channelController.channelDelete);
router.post('/follow',channelController.channelFollow);

export default router;