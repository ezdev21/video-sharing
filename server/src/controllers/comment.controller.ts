import type { Request, Response } from "express";
import type { Comment } from '../types/index';
import prisma from "../../prisma/client";

export const comment_index = (req: Request, res: Response) => {
  prisma.comment.findMany()
    .then((comments: Comment[]) => {
      res.send(comments);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error fetching comments' });
    });  
}

export const comment_details = (req: Request, res: Response) => {
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

export const comment_create = (req: Request, res: Response) => {
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

export const comment_delete = (req: Request, res: Response) => {
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
