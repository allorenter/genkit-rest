import express from 'express';
import UserController from './user.controller';
import isAuth from '../../middleware/auth';

const router = express.Router();

router.get('/user-exists/:userName', UserController.userExists);

router.post('/sign-up', UserController.signUp);

router.get('/check-auth', isAuth, UserController.checkAuth);

router.post('/sign-in', UserController.signIn);

export default router;
