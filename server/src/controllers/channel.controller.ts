import type { Request, Response } from "express";
import prisma from "../../prisma/client.js";
import type { Channel, Video } from "../schemas/schemas.js";
import { ChannelFollower } from "../../generated/prisma/client.js";
import { includes } from "zod";

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

export const channelDetails = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const channel = await prisma.channel.findUnique({
      where: { id: id },
    });
    const followers = await prisma.ChannelFollower.count({
      where: {channelId: id}
    });
    const totalVideos = await prisma.video.count({
      where: {channelId: id}
    })
    channel.followers = followers;
    channel.totalVideos = totalVideos;
    res.status(200).send(channel); 
  } catch (error) {
    res.status(500).json({message: 'error fetching channel data'});
  }
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
  const {userId, channelId} = req.query
  prisma.ChannelFollower.findFirst({
    where: {
      userId: userId,
      channelId: channelId
    }
  })
  .then((ChannelFollower: ChannelFollower) => {
    if(ChannelFollower){
      res.status(200).send({following: true,message: "user follows this channel"})
    }
    else{
      res.status(200).send({following: false,message: "user does not follow this channel"})
    }
  })
  .catch((err: unknown) => {
    console.log(err);
    res.status(500).send({ title: 'Error follwing channel' });
  });
}

export const channelFollow = (req: Request, res: Response) => {
  const { userId, channelId } = req.body
  
  prisma.ChannelFollower.findUnique({
    where: {
      userId_channelId: {
        userId,
        channelId,
      },
    },
  })
  .then((channelFollow: ChannelFollower) => {
    if (channelFollow) {
      return prisma.ChannelFollower.delete({
        where: {
          userId_channelId: {
            userId,
            channelId,
          },
        },
      })
      .then(() => {
        res.status(200).send({
          following: false,
          message: "Channel unfollowed successfully",
        })
      })
    }

    return prisma.ChannelFollower.create({
      data: {
        userId,
        channelId,
      },
    })
    .then(() => {
      res.status(200).send({
        following: true,
        message: "Channel followed successfully",
      })
    })
  })
  .catch((err: unknown) => {
    console.error(err)
    res.status(500).send({ title: "Error following channel" })
  })
}

export const channelVideos = (req: Request, res: Response) => {
  const channelId = req.params.id;
  prisma.video.findMany({
    where: { channelId: channelId },
  })
  .then((videos: Video[]) => {
    res.status(200).send(videos);
  })
  .catch((err: unknown) => {
    console.log(err);
    res.status(500).send({ title: 'Error fetching channel videos' });
  });
}

export const channelPosts = (req: Request, res: Response) => {
  const channelId = req.params.id;
  prisma.post.findMany({ where: { channelId: channelId } })
  .then((videos: Video[]) => {
    res.status(200).send(videos);
  })
  .catch((err: unknown) => {
    console.log(err);
    res.status(500).send({ title: 'Error fetching channel videos' });
  });
}

export const channelPlaylists = (req: Request, res: Response) => {
  const channelId = req.params.id;
  prisma.playlist.findMany({ where: { channelId: channelId } })
  .then((videos: Video[]) => {
    res.status(200).send(videos);
  })
  .catch((err: unknown) => {
    console.log(err);
    res.status(500).send({ title: 'Error fetching channel videos' });
  });
}