import type { Request, Response } from "express";
import prisma from "../../prisma/client.js";
import type { Post } from "../schemas/schemas.js";

export const postIndex = (req: Request, res: Response) => {
  prisma.post.findMany()
    .then((posts: Post[]) => {
      res.status(200).send(posts);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error fetching posts' });
    });  
}

export const postDetails = (req: Request, res: Response) => {
  const id = req.params.id;
  prisma.post.findUnique({ where: { id: id } })
    .then((post: Post | null) => {
      res.status(200).send(post);
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
      res.status(201).send(post);
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
    where: { id: id },
    data: postData
  })
    .then((post: Post) => {
      res.status(200).send(post);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error updating post' });
    });
}

export const postDelete = (req: Request, res: Response) => {
  const id = req.params.id;
  prisma.post.delete({ where: { id: id } })
    .then(() => {
      res.status(200).send({ message: 'Post deleted successfully' });
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error deleting post' });
    });
}
