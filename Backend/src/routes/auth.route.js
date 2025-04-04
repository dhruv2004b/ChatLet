import express from 'express'
import { login, signout, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/signout',signout);


export default router;