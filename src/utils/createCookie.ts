import { Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

export const createCookie = (res: Response, userId: string) => {
  const token = jwt.sign({ userId }, config.jwt_secret, {
    expiresIn: '7d',
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};
