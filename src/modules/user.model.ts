import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: 'user',
      enum: ['user', 'admin'],
    },
    verifyToken: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyTokenExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    forgotPasswordToken: String,
    forgotPasswordTokenExpire: Date,
  },
  { timestamps: true },
);

export default mongoose.model('User', userSchema);
