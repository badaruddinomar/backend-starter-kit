import { Request, Response, NextFunction, RequestHandler } from 'express';
import catchAsync from '../utils/catchAsyn';
import User from '../models/user.model';
import AppError from '../utils/AppError';
import bcryptjs from 'bcryptjs';
import httpStatus from 'http-status';
import { createCookie } from '../utils/createCookie';
import sendEmail from '../utils/sendEmail';
import { verifyEmailTemplate } from '../emailTemplates/verifyEmailTemplate';

export const signup: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    // check if user exists--
    const user = await User.findOne({ email });
    if (user) {
      throw next(new AppError(httpStatus.BAD_REQUEST, 'User already exists!'));
    }

    // hash password--
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    // create new user--
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    // create verify token--
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    newUser.verifyCode = verificationCode;
    newUser.verifyCodeExpire = new Date(new Date().getTime() + 15 * 60 * 1000);

    // save user--
    await newUser.save();

    // set cookie--
    createCookie(res, newUser._id);
    // send verification email--
    await sendEmail({
      reciverEmail: newUser.email,
      subject: 'Verify your email',
      body: verifyEmailTemplate(verificationCode),
    });
    // send response to client--
    res.status(httpStatus.CREATED).json({
      success: true,
      message: 'user created successfully',
      data: newUser,
    });
  },
);

export const verifyEmail: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { verificationCode } = req.body;
    // check if verification code is valid--
    const user = await User.findOne({
      verifyCode: verificationCode,
      verifyCodeExpire: { $gt: Date.now() },
    });

    // if not valid--
    if (!user) {
      throw next(new AppError(httpStatus.BAD_REQUEST, 'Invalid code'));
    }
    // if valid--
    user.isVerified = true;
    user.verifyCode = undefined;
    user.verifyCodeExpire = undefined;
    await user.save();
    // send response to client--
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Email verified successfully',
    });
  },
);
