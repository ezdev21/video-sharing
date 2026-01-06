import type { Request, Response } from "express";
import prisma from "../../prisma/client.js";
import type { User } from "../schemas/schemas.js";
import { email } from "zod";

export const userIndex = (req: Request, res: Response) => {
  prisma.user.findMany()
    .then((users: User[]) => {
      res.status(200).send(users);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error fetching users' });
    });
}

export const userDetails = (req: Request, res: Response) => {
  const id = req.params.id;
  prisma.user.findUnique({ where: { id: id }, select: { password: false} })
    .then((user: User | null) => {
      res.status(200).send(user);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error fetching user details' });
    });
}

export const userCreate = (req: Request, res: Response) => {
  const userData = req.body;
  prisma.user.create({ data: userData })
    .then((user: User) => {
      res.status(201).send(user);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error creating user' });
    });
}

export const userUpdate = (req: Request, res: Response) => {
  const id = req.params.id;
  const userData = req.body;
  prisma.user.update({
    where: { id: id },
    data: userData
  })
    .then((user: User) => {
      res.status(200).send(user);
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error updating user' });
    });
}

export const userDelete = (req: Request, res: Response) => {
  const id = req.params.id;
  prisma.user.delete({ where: { id: id } })
    .then(() => {
      res.status(200).send({ message: 'User deleted successfully' });
    })
    .catch((err: unknown) => {
      console.log(err);
      res.status(500).send({ title: 'Error deleting user' });
    });
}
