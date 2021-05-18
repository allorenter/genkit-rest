import express from 'express';
import UserController from './user.controller';

const router = express.Router();

router.get('/user-exists/:userName', UserController.userExists);

router.post('/sign-up', UserController.signUp);

export default router;
