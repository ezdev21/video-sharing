import type { Request, Response } from "express";
import prisma from "../../prisma/client.js";
import type { Video } from "../schemas/schemas.js";

export const videoIndex = (req: Request, res: Response) => {
  prisma.video.findMany({
    orderBy: { createdAt: 'desc' },
    take:50,
    include: { channel: true } 
  })
    .then((videos: Video[]) => {
      res.status(200).send(videos);
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
      res.status(200).send(videos);
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
      NOT: { id: id }
    },
    take: 25,
    orderBy: { createdAt: 'desc' },
    include: { channel: true }
  })
  .then((videos: Video[]) => {
    res.status(200).send(videos);
  })
  .catch((err: unknown) => {
    console.log(err);
    res.status(500).send({ title: 'Error fetching recommended videos' });
  });
}

export const videoDetails = (req: Request, res: Response) => {
  const id = req.params.id;
  prisma.video.findUnique({ 
    where: { id:id }, 
    include: { channel: true } 
  })
    .then((video: Video | null) => {
      res.status(200).send(video);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error fetching video details' });
    });
}

export const videoCreate = (req: Request, res: Response) => {
  const { userId, channelId, title, description } = req.body;
  const thumbnail = (req.files as any)?.thumbnail?.[0];
  const video = (req.files as any)?.video?.[0];
  
  const files = req.files as {
    thumbnail?: Express.Multer.File[];
    video?: Express.Multer.File[];
  };
  
   if (!files?.thumbnail || !files?.video) {
    return res.status(400).json({
      message: "Thumbnail and Video are required",
    });
  }

  prisma.video.create({
    data: {
      userId,
      channelId,
      title,
      description,
      thumbnail: thumbnail.filename,
      src: video.filename
    } 
  })
  .then((video: Video) => {
    res.status(201).send(video);
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
      res.status(200).send(video);
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
      res.status(200).send({ message: 'Video deleted successfully' });
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error deleting video' });
    });
}

export const videoSearch = (req: Request, res: Response) => {
  const query = req.query.query as string;
  prisma.video.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } }
      ]
    },
    include: { channel: true },
    take: 50
  })
    .then((videos: Video[]) => {
      res.status(200).send(videos);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error searching videos' });
    });
}
