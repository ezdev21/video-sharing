import type { Request, Response } from "express";
import prisma from "../../prisma/client.js";
import type { Channel } from "../schemas/schemas.js";

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
  prisma.channel.findUnique({ where: { id: id } })
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
      userId,
      name,
      description,
      avatar: avatar.filename,
      background: background.filename,
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
    where: { id: id },
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
  prisma.channel.delete({ where: { id: id } })
    .then(() => {
      res.status(200).send({ message: 'Channel deleted successfully' });
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error deleting channel' });
    });
}

export const channelFollowing = (req: Request, res: Response) => {
  const {userId, channelId} = req.body
  prisma.channelFollow.findFirst({
    where: {
      userId: userId,
      channelId: channelId
    }
  })
  .then(() => {
    res.status(200).send({ message: 'user follows this channel' });
  })
  .catch((err: unknown) => {
    console.log(err);
    res.status(500).send({ title: 'Error follwing channel' });
  });
}

export const channelFollow = (req: Request, res: Response) => {
  const {userId, channelId} = req.body
  prisma.channelFollow.create({
    data: {
      userId,
      channelId
    }
  })
  .then(() => {
    res.status(200).send({ message: 'Channel followed successfully' });
  })
  .catch((err: unknown) => {
    console.log(err);
    res.status(500).send({ title: 'Error follwing channel' });
  });
}
