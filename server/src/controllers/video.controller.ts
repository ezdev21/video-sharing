import type { Request, Response } from "express";
import prisma from "../../prisma/client.js";
import { Video } from "../types/index.js";

export const videoIndex = (req: Request, res: Response) => {
  prisma.video.findMany({orderBy: { createdAt: 'desc' }, take:50, include: { channel: true } })
    .then((videos: Video[]) => {
      res.send(videos);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error fetching videos' });
    });  
}

export const videoByChannel = (req: Request, res: Response) => {
  const channelId = req.params.channelId;
  prisma.video.findMany({ where: { channelId: Number(channelId) } })
    .then((videos: Video[]) => {
      res.send(videos);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error fetching videos by channel' });
    });
}

export const videoRecommended = (req: Request, res: Response) => {
  const id = req.params.id;
  prisma.video.findMany({
    where: {
      NOT: { id: Number(id) }
    },
    take: 25,
    orderBy: { createdAt: 'desc' },
  })
  .then((videos: Video[]) => {
    res.send(videos);
  })
  .catch((err: unknown) => {
    console.log(err);
    res.status(500).send({ title: 'Error fetching recommended videos' });
  });
}

export const videoDetails = (req: Request, res: Response) => {
  const id = req.params.id;
  prisma.video.findUnique({ where: { id: Number(id) }, include: { channel: true } })
    .then((video: Video | null) => {
      res.send(video);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error fetching video details' });
    });
}

export const videoCreate = (req: Request, res: Response) => {
  const videoData = req.body;
  prisma.video.create({ data: videoData })
    .then((video: Video) => {
      res.send(video);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error creating video' });
    });
}

export const videoUpdate = (req: Request, res: Response) => {
  const id = req.params.id;
  const videoData = req.body;
  prisma.video.update({
    where: { id: Number(id) },
    data: videoData
  })
    .then((video: Video) => {
      res.send(video);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error updating video' });
    });
}

export const videoDelete = (req: Request, res: Response) => {
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
