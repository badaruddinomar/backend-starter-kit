import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/user.model';
import config from '../config';
import httpStatus from 'http-status';
import { IUser } from '../interface/user.interface';
import catchAsync from '../utils/catchAsync';
export const isAuthenticatedUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;

    if (!token) {
      throw next(
        new AppError(
          httpStatus.UNAUTHORIZED,
          'Please login to access this resource.',
        ),
      );
    }

    const decodedData = jwt.verify(token, config.jwt_secret) as JwtPayload;
    const user = await User.findById(decodedData?.userId);
    if (!user) {
      throw next(
        new AppError(
          httpStatus.UNAUTHORIZED,
          'Please login to access this resource.',
        ),
      );
    }
    req.user = user as IUser;
    next();
  },
);

// Authorize Roles--
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role as string)) {
      return next(
        new AppError(
          httpStatus.FORBIDDEN,
          `Role ${req.user.role} is not allowed to access this resource.`,
        ),
      );
    }
    next();
  };
};
