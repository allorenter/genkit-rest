import express from 'express';
import UserController from './user.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.get('/user-exists/:userName', UserController.userExists);

router.post('/sign-up', UserController.signUp);

router.get('/private', auth.isAuth, (req, res) => {
  res.status(200).send({ message: 'tienes acceso' });
});

export default router;
