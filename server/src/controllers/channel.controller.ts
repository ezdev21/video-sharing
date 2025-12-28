import type { Request, Response } from "express";
import prisma from "../../prisma/client.js";
import { Channel } from "../types/index.js";
import multer from "multer"
import path from "path";

export const channelIndex = (req: Request, res: Response) => {
  prisma.channel.findMany()
    .then((channels: Channel[]) => {
      res.status(200).send(channels);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error fetching channels' });
    });  
}

export const channelDetails = (req: Request, res: Response) => {
  const id = req.params.id;
  prisma.channel.findUnique({ where: { id: Number(id) } })
    .then((channel: Channel | null) => {
      res.status(200).send(channel);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error fetching channel details' });
    });
}

export const channelCreate = (req: Request, res: Response) => {
  const { userId, name, description } = req.body;
  const parsedUserId = Number(userId);
  const avatar = (req.files as any)?.avatar?.[0];
  const background = (req.files as any)?.background?.[0];
  
  const files = req.files as {
    avatar?: Express.Multer.File[];
    background?: Express.Multer.File[];
  };

  if (!files?.avatar || !files?.background) {
    return res.status(400).json({
      message: "Avatar and background are required",
    });
  }

  prisma.channel.create({
     data: {
      userId:parsedUserId,
      name,
      description,
      avatar: avatar.originalname,
      background: background.originalname,
     }
  })
  .then((channel: Channel) => {
    res.status(201).send(channel);
  })
  .catch((err: unknown) => {
    console.log(err)
    res.status(500).send({ title: 'Error creating channel' });
  });
}

export const channelUpdate = (req: Request, res: Response) => {
  const id = req.params.id;
  const channelData = req.body;
  prisma.channel.update({
    where: { id: Number(id) },
    data: channelData
  })
  .then((channel: Channel) => {
    res.status(200).send(channel);
  })
  .catch((err: unknown) => {
     console.log(err);
      res.status(500).send({ title: 'Error updating channel' });
  });
}  

export const channelDelete = (req: Request, res: Response) => {
  const id = req.params.id;
  prisma.channel.delete({ where: { id: Number(id) } })
    .then(() => {
      res.status(200).send({ message: 'Channel deleted successfully' });
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error deleting channel' });
    });
}

// const uploadImage = (req) => {
//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "uploads/images/channel/");
//     },
//     filename: (req, file, cb) => {
//       const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       cb(null, uniqueName + path.extname(file.originalname));
//     },
//   });

//   const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     "image/jpeg",
//     "image/png",
//     "image/webp",
//   ];

//   if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error("unsupported image format"), false);
//     }
//   };
  
//   const upload = multer({
//     storage,
//     fileFilter,
//     limits: {
//       fileSize: 50 * 1024 * 1024, // 50MB
//     },
//   });
// }
