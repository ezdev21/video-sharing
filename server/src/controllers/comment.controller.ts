import type { Request, Response } from "express";
import type { Comment } from '../types/index';
import prisma from "../../prisma/client";

export const commentIndex = (req: Request, res: Response) => {
  prisma.comment.findMany()
    .then((comments: Comment[]) => {
      res.send(comments);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error fetching comments' });
    });  
}

export const commentDetails = (req: Request, res: Response) => {
  const id = req.params.id;
  prisma.comment.findUnique({ where: { id: Number(id) } })
    .then((comment: Comment) => {
      res.send(comment);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error fetching comment details' });
    });
}

export const commentCreate = (req: Request, res: Response) => {
  const commentData: Comment = req.body;
  prisma.comment.create({ data: commentData })
    .then((comment: Comment) => {
      res.send(comment);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error creating comment' });
    });
}

export const commentUpdate = (req: Request, res: Response) => {
  const id = req.params.id;
  const commentData: Comment = req.body;
  prisma.comment.update({
    where: { id: Number(id) },
    data: commentData
  })
  .then((comment: Comment) => {
    res.send(comment);
  })
  .catch((err: unknown) => {
     console.log(err);
      res.status(500).send({ title: 'Error updating post' });
  });
}  

export const commentDelete = (req: Request, res: Response) => {
  const id = req.params.id;
  prisma.comment.delete({ where: { id: Number(id) } })
    .then(() => {
      res.send({ message: 'Comment deleted successfully' });
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error deleting comment' });
    });
}
