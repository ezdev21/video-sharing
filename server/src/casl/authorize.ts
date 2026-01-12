import { ForbiddenError } from '@casl/ability';
import { defineAbility } from './ability.js';
import { NextFunction, Request, Response } from 'express';

export const authorize =
  (action: string, subject: string) =>
  (req: Request, res: Response, next: NextFunction) => {
    const ability = defineAbility(req.user: User);

    try {
      ForbiddenError.from(ability).throwUnlessCan(action, subject);
      next();
    } catch {
      res.status(403).json({ message: 'Forbidden' });
    }
  };
