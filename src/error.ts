import { Response } from 'express'
export const AllException = (err: any, req: any, res: Response, next: any) => {
  console.log('\x1b[36m', err.stack, '\x1b[0m');

  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    message: err.message || 'Internal Server Error!',
    statusCode: statusCode,
  });
}