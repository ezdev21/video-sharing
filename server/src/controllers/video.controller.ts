import type { Request, Response } from "express";
import prisma from "../../prisma/client.js";
import type { Video } from "../schemas/schemas.js";
import { VideoReaction } from "../../generated/prisma/client.js";

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

export const videoDetails = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const video = await prisma.video.update({
      where: { id: id },
      data: { views: { increment: 1 } },
      include: { channel: true }
    });
    const followers = await prisma.ChannelFollower.count({
      where: {channelId: video.channel.id}
    });
    video.channel.followers = followers;
    res.status(200).send(video); 
  } catch (error) {
    res.status(500).json({message: "error occured while fetching video details"})
  }
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
    where: { id: id },
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
  prisma.video.delete({ where: { id: id } })
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

export const videoReact = (req: Request, res: Response) => {
  const { userId, videoId, type } = req.body;
  prisma.VideoReaction.findUnique({
    where: { userId_videoId: { userId, videoId } },
  })
  .then((reaction: VideoReaction) => {
    if (!reaction) {
      return prisma.VideoReaction.create({
        data: { userId, videoId, type },
      })
      .then(() => res.status(200).send({ type, message: `${type} added` }));
    }
    if (reaction.type === type) {
      return prisma.VideoReaction.delete({
        where: { userId_videoId: { userId, videoId } },
      })
      .then(() => res.status(200).send({ type: null, message: `${type} removed` }));
    }
    return prisma.VideoReaction.update({
      where: { userId_videoId: { userId, videoId } },
      data: { type },
    })
    .then(() => res.status(200).send({ type, message: `Changed reaction to ${type}` }));
  })
  .catch((err: unknown) => {
    console.error(err);
    res.status(500).send({ message: 'Error reacting to video' });
  });
};

export const VideoReacts = async (req: Request, res: Response) => {
  const { videoId } = req.query;
  const likeReactions = await prisma.VideoReaction.count({
    where: { videoId, type: 'LIKE' },
  });
  const dislikeReactions = await prisma.VideoReaction.count({
    where: { videoId, type: 'DISLIKE' },
  });
  res.status(200).json({ likeReactions, dislikeReactions });
}

export const userReaction = (req:Request, res:Response) => {
  const {userId, videoId} = req.query;
  prisma.VideoReaction.findUnique({
    where: {
      userId_videoId: {
        userId,
        videoId,
      },
    },
  })
  .then((videoReact: VideoReaction | null) =>{
     if(videoReact){
       if(videoReact.type == "LIKE"){
         res.status(200).json({liked:true,disliked:false})
       }
       else if(videoReact.type == "DISLIKE"){
         res.status(200).json({liked:false,disliked:true})
       }
       else{
        res.status(200).json({liked:false,disliked:false})
       }
     }
     else{
       res.status(200).json({liked:false,disliked:false})
     }
  })
  .catch((err:unknown) => {
    res.status(500).send('error fetching user video reactions');
  })
}