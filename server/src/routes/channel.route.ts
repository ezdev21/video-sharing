import express from "express";
import { channelIndex, channelDetails, channelCreate, channelUpdate, channelDelete } from "../controllers/channel.controller";

const router = express.Router();

router.get('/', channelIndex);
router.post('/', channelCreate);
router.get('/:id', channelDetails);
router.put('/:id', channelUpdate);
router.delete('/:id', channelDelete);

export default router;