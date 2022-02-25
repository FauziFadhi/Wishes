import HttpException from '@utils/http-exception';
import { NextFunction, Response } from 'express';
import User from 'src/models/User';

export default async function (req: any, res: Response, next: NextFunction) {
  const authorization = req.header('Authorization');
  if (!authorization) throw new HttpException('Unauthenticated', 401);

  const [, token] = authorization.split(' ');
  if (!token) throw new HttpException('Unauthenticated', 401);

  const decodedToken = Buffer.from(token, 'base64').toString('utf-8');
  const [username, password] = decodedToken.split(':');

  const usernameNum = username?.replace('user', '');
  const passwordNum = password?.replace('password', '');

  if (usernameNum != passwordNum)
    throw new HttpException('Unauthenticated', 401);

  await User.findByPk(usernameNum, {
    attributes: ['id'],
    rejectOnEmpty: new HttpException('Unauthenticated', 401),
  });

  req.user = {
    username,
    password,
  };

  next();
}
