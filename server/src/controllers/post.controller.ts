import type { Request, Response } from "express";
import prisma from "../../prisma/client.js";
import { Post } from "../types/index.js";

export const postIndex = (req: Request, res: Response) => {
  prisma.post.findMany()
    .then((posts: Post[]) => {
      res.send(posts);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error fetching posts' });
    });  
}

export const postDetails = (req: Request, res: Response) => {
  const id = req.params.id;
  prisma.post.findUnique({ where: { id: Number(id) } })
    .then((post: Post | null) => {
      res.send(post);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error fetching post details' });
    });
}

export const postCreate = (req: Request, res: Response) => {
  const postData = req.body;
  prisma.post.create({ data: postData })
    .then((post: Post) => {
      res.send(post);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error creating post' });
    });
}

export const postUpdate = (req: Request, res: Response) => {
  const id = req.params.id;
  const postData = req.body;
  prisma.post.update({
    where: { id: Number(id) },
    data: postData
  })
    .then((post: Post) => {
      res.send(post);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error updating post' });
    });
}

export const postDelete = (req: Request, res: Response) => {
  const id = req.params.id;
  prisma.post.delete({ where: { id: Number(id) } })
    .then(() => {
      res.send({ message: 'Post deleted successfully' });
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error deleting post' });
    });
}
