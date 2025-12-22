import type { Request, Response } from "express";
import type { Video } from '../types/index';
import prisma from "../../prisma/client";

export const video_index = (req: Request, res: Response) => {
  prisma.video.findMany()
    .then((videos: Video[]) => {
      res.send(videos);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error fetching videos' });
    });  
}

export const video_details = (req: Request, res: Response) => {
  const id = req.params.id;
  prisma.video.findUnique({ where: { id: Number(id) } })
    .then((video: Video) => {
      res.send(video);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error fetching video details' });
    });
}

export const video_create = (req: Request, res: Response) => {
  const videoData: Video = req.body;
  prisma.video.create({ data: videoData })
    .then((video: Video) => {
      res.send(video);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error creating video' });
    });
}

export const video_delete = (req: Request, res: Response) => {
  const id = req.params.id;
  prisma.video.delete({ where: { id: Number(id) } })
    .then(() => {
      res.send({ message: 'Video deleted successfully' });
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error deleting video' });
    });
}
