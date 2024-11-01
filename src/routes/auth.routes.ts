import express from 'express';
import validateRequest from '../middleware/validateRequest';
import { userSchema } from '../validation/user.validation';
import { signup } from '../controllers/auth.controllers';
const router = express.Router();

router.post('/signup', validateRequest(userSchema), signup);

export default router;
