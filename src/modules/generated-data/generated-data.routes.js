import express from 'express';
import GeneratedDataController from './generated-data.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/preview', auth.isAuth, GeneratedDataController.preview);

export default router;
