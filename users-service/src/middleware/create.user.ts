import { NextFunction, Request, Response } from 'express';
import { userSchema } from '../validation/user.validation';
import { STATUS } from '../utils/statusCode';

export const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const parsed = userSchema
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
