import { Response } from 'express';
export default function (err: any, req: any, res: Response, next: any) {
  console.log('\x1b[36m', err.stack, '\x1b[0m');

  // console.log(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    message: err.message || 'Internal Server Error!',
    statusCode: statusCode,
  });
}
