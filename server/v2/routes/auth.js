import dotenv from 'dotenv';
import express from 'express';
import { signupChecker, signinChecker } from '../helpers/authValidator';
import controller from '../controllers/authController';

dotenv.config();

const router = express.Router();

router.post('/signin', signinChecker, controller.signin);
router.post('/signup', signupChecker, controller.signup);

export default router;
