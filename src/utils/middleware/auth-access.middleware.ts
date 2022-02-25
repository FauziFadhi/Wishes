import HttpException from '@utils/http-exception';
import { NextFunction, Request, Response } from 'express';

export default async function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const user = (req as any).user;

  const userId = req.params?.id;

  const predictedUsername = `user${userId}`;

  if (user?.username != predictedUsername)
    throw new HttpException('Unauthorized', 403);

  next();
}
