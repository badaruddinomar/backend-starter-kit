import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { ZodSchema } from 'zod';

const validateRequest =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        errors: result.error.errors.map((error) => ({
          path: error.path.join('.'),
          message: error.message,
        })),
      });
      return;
    }

    req.body = result.data;
    next();
  };

export default validateRequest;
