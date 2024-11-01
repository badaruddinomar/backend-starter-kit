export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role?: string;
  verifyToken?: string;
  isVerified?: boolean;
  verifyTokenExpire?: Date;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  resetPasswordTokenExpire?: Date;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpire?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
