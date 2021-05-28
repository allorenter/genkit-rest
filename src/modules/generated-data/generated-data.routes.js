import express from 'express';
import GeneratedDataController from './generated-data.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/preview', GeneratedDataController.preview);

router.post('/generate-json', auth.isAuth, GeneratedDataController.generateJSON);

router.post('/generate-csv', auth.isAuth, GeneratedDataController.generateCSV);

export default router;
