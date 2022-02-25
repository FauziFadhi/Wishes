import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import HttpException from '../http-exception';

export default function <T>(cls: T) {
  if (!cls || !toValidate(cls)) {
    return async function (req: Request, res: Response, next: NextFunction) {
      next();
    };
  }

  return async function (req: Request, res: Response, next: NextFunction) {
    const value = req.body;
    const object = plainToInstance(cls as any, value);

    const errors = await validate(object);
    if (errors.length > 0) {
      const mappedErrors = errors.map((error) => {
        const children = error.children;
        if (children?.length == 0)
          return Object.values(error?.constraints as any);

        if (children) {
          return getChildrenConstraint(children[0]);
        }
      });
      throw new HttpException(mappedErrors.flat(), 422);
    }
    next();
  };
}

function toValidate(metatype: any): boolean {
  const types: any[] = [String, Boolean, Number, Array, Object];
  return !types.includes(metatype);
}

function getChildrenConstraint(children: any): any {
  if (children.constraints) return Object.values(children.constraints);

  const grandChildren = children.children[0];
  return getChildrenConstraint(grandChildren);
}
