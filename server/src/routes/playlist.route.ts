import express from "express";
import playlistController from "../controllers/playlist.controller.ts";

const router = express.Router();

router.get('/', playlistController.playlist_index);
router.post('/', playlistController.playlist_create);
router.get('/:id', playlistController.playlist_details);
router.delete('/:id', playlistController.playlist_delete);

export default router;