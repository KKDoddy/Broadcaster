import dotenv from 'dotenv';
import express from 'express';
import { signupChecker } from '../helpers/authValidator';
import controller from '../controllers/authController';

dotenv.config();

const router = express.Router();

router.post('/signup', signupChecker, controller.signup);

export default router;
