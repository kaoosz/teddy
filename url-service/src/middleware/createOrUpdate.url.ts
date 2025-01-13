import { NextFunction, Request, Response } from 'express';
import { urlSchema } from '../validation/url.validation';
import { STATUS } from '../utils/statusCode';

export const validateCreateOrUpdateUrl = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const parsed = urlSchema
    .strip()
    .safeParse(req.body);
  if (!parsed.success) {
    res.status(STATUS.BAD_REQUEST).json({
      error: parsed.error.errors.map((err) => err.message),
    });
    return;
  }
  req.body = parsed.data;
  next();
};
