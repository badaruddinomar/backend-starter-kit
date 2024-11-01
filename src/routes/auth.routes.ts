import express from 'express';
import validateRequest from '../middleware/validateRequest';
import { userSchema } from '../validation/user.validation';
import {
  signup,
  verifyEmail,
  signin,
  forgotPassword,
} from '../controllers/auth.controllers';
const router = express.Router();

router.post('/signup', validateRequest(userSchema), signup);
router.post('/verify-email', verifyEmail);
router.post('/signin', signin);
router.post('/forgot-password', forgotPassword);

export default router;
