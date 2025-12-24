import express from "express";
import * as playlistController from "../controllers/playlist.controller.js";

const router = express.Router();

router.get('/', playlistController.playlistIndex);
router.post('/', playlistController.playlistCreate);
router.get('/:id', playlistController.playlistDetails);
router.put('/:id', playlistController.playlistUpdate);
router.delete('/:id', playlistController.playlistDelete);
export default router;