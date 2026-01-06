import type { Request, Response } from "express";
import prisma from "../../prisma/client.js";
import type { Comment } from "../schemas/schemas.js";

export const commentIndex = (req: Request, res: Response) => {
  prisma.comment.findMany({ include: {user: true}})
    .then((comments: Comment[]) => {
      res.status(200).send(comments);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error fetching comments' });
    });  
}

export const commentDetails = (req: Request, res: Response) => {
  const id = req.params.id;
  prisma.comment.findUnique({ where: { id: id } })
    .then((comment: Comment | null) => {
      res.status(200).send(comment);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error fetching comment details' });
    });
}

export const commentCreate = (req: Request, res: Response) => {
  const commentData = req.body;
  prisma.comment.create({ data: commentData })
    .then((comment: Comment) => {
      res.status(201).send(comment);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error creating comment' });
    });
}

export const commentUpdate = (req: Request, res: Response) => {
  const id = req.params.id;
  const commentData = req.body;
  prisma.comment.update({
    where: { id: id },
    data: commentData
  })
  .then((comment: Comment) => {
    res.status(200).send(comment);
  })
  .catch((err: unknown) => {
     console.log(err);
      res.status(500).send({ title: 'Error updating post' });
  });
}  

export const commentDelete = (req: Request, res: Response) => {
  const id = req.params.id;
  prisma.comment.delete({ where: { id: id } })
    .then(() => {
      res.status(200).send({ message: 'Comment deleted successfully' });
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error deleting comment' });
    });
}
