import express from "express";
import channelController from "../controllers/channel.controller";

const router = express.Router();

router.get('/', channelController.channel_index);
router.post('/', channelController.channel_create);
router.get('/:id', channelController.channel_details);
router.delete('/:id', channelController.channel_delete);

export default router;