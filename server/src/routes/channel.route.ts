import express from "express";
import * as channelController from "../controllers/channel.controller";
const router = express.Router();

router.get('/', channelController.channelIndex);
router.post('/', channelController.channelCreate);
router.get('/:id', channelController.channelDetails);
router.put('/:id', channelController.channelUpdate);
router.delete('/:id', channelController.channelDelete);
export default router;