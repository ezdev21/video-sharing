import type { Request, Response } from "express";
import prisma from "../../prisma/client.js";
import type { Playlist } from "../schemas/schemas.js";

export const playlistIndex = (req: Request, res: Response) => {
  prisma.playlist.findMany()
    .then((playlists: Playlist[]) => {
      res.status(200).send(playlists);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error fetching playlists' });
    });  
}

export const playlistDetails = (req: Request, res: Response) => {
  const id = req.params.id;
  prisma.playlist.findUnique({ where: { id: id } })
    .then((playlist: Playlist | null) => {
      res.status(200).send(playlist);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error fetching playlist details' });
    });
}

export const playlistCreate = (req: Request, res: Response) => {
  const playlistData = req.body;
  prisma.playlist.create({ data: playlistData })
    .then((playlist: Playlist) => {
      res.status(201).send(playlist);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error creating playlist' });
    });
}

export const playlistUpdate = (req: Request, res: Response) => {
  const id = req.params.id;
  const playlistData = req.body;
  prisma.playlist.update({
    where: { id: id },
    data: playlistData
  })
  .then((playlist: Playlist) => {
    res.status(200).send(playlist);
  })
  .catch((err: unknown) => {
     console.log(err);
      res.status(500).send({ title: 'Error updating post' });
  });
}

export const playlistDelete = (req: Request, res: Response) => {
  const id = req.params.id;
  prisma.playlist.delete({ where: { id: id } })
    .then(() => {
      res.status(200).send({ message: 'Playlist deleted successfully' });
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error deleting playlist' });
    });
}
