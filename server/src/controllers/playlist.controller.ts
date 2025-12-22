import type { Request, Response } from "express";
import type { Playlist } from '../types/index';
import prisma from "../../prisma/client";

export const playlist_index = (req: Request, res: Response) => {
  prisma.playlist.findMany()
    .then((playlists: Playlist[]) => {
      res.send(playlists);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error fetching playlists' });
    });  
}

export const playlist_details = (req: Request, res: Response) => {
  const id = req.params.id;
  prisma.playlist.findUnique({ where: { id: Number(id) } })
    .then((playlist: Playlist) => {
      res.send(playlist);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error fetching playlist details' });
    });
}

export const playlist_create = (req: Request, res: Response) => {
  const playlistData: Playlist = req.body;
  prisma.playlist.create({ data: playlistData })
    .then((playlist: Playlist) => {
      res.send(playlist);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error creating playlist' });
    });
}

export const playlist_delete = (req: Request, res: Response) => {
  const id = req.params.id;
  prisma.playlist.delete({ where: { id: Number(id) } })
    .then(() => {
      res.send({ message: 'Playlist deleted successfully' });
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error deleting playlist' });
    });
}
