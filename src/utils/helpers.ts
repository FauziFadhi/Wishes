import { ClassTransformOptions, plainToInstance } from 'class-transformer';

export const circularToJSON = (circular: unknown) =>
  JSON.parse(JSON.stringify(circular));

  export function transformer<T, V>(
    cls: { new (...args: unknown[]): T },
    obj: V,
    options?: ClassTransformOptions,
  ): T;
  export function transformer<T, V>(
    cls: { new (...args: unknown[]): T },
    obj: V[],
    options?: ClassTransformOptions,
  ): T[];
  export function transformer(...args: any[]) {
    const result = plainToInstance(args[0], circularToJSON(args[1]), {
      excludeExtraneousValues: true,
      exposeUnsetFields: true,
      enableImplicitConversion: true,
      exposeDefaultValues: true,
      ...args[2],
    });
    return result as unknown;
  }
