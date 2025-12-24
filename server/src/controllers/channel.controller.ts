import type { Request, Response } from "express";
import prisma from "../../prisma/client.js";
import { Channel } from "../types/index.js";

export const channelIndex = (req: Request, res: Response) => {
  prisma.channel.findMany()
    .then((channels: Channel[]) => {
      res.send(channels);
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
      res.send(channel);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error fetching channel details' });
    });
}

export const channelCreate = (req: Request, res: Response) => {
  const channelData = req.body;
  prisma.channel.create({ data: channelData })
    .then((channel: Channel) => {
      res.send(channel);
    })
    .catch((err: unknown) => {
      console.log(err);
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
    res.send(channel);
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
      res.send({ message: 'Channel deleted successfully' });
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error deleting channel' });
    });
}
