import express from "express";
import { playlistIndex, playlistDetails, playlistCreate, playlistUpdate, playlistDelete } from "../controllers/playlist.controller";

const router = express.Router();

router.get('/', playlistIndex);
router.post('/', playlistCreate);
router.get('/:id', playlistDetails);
router.put('/:id', playlistUpdate);
router.delete('/:id', playlistDelete);

export default router;