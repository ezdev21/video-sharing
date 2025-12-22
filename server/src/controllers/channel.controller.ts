import type { Request, Response } from "express";
import type { Channel } from '../types/index';
import prisma from "../../prisma/client";

export const channel_index = (req: Request, res: Response) => {
  prisma.channel.findMany()
    .then((channels: Channel[]) => {
      res.send(channels);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error fetching channels' });
    });  
}

export const channel_details = (req: Request, res: Response) => {
  const id = req.params.id;
  prisma.channel.findUnique({ where: { id: Number(id) } })
    .then((channel: Channel) => {
      res.send(channel);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error fetching channel details' });
    });
}

export const channel_create = (req: Request, res: Response) => {
  const channelData: Channel = req.body;
  prisma.channel.create({ data: channelData })
    .then((channel: Channel) => {
      res.send(channel);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error creating channel' });
    });
}

export const channel_delete = (req: Request, res: Response) => {
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
