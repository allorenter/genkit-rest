import express from 'express';
import GeneratedDataController from './generated-data.controller';
import isAuth from '../../middleware/auth';

const router = express.Router();

router.post('/preview', GeneratedDataController.preview);

router.post('/generate-json', isAuth, GeneratedDataController.generateJSON);

router.post('/generate-csv', isAuth, GeneratedDataController.generateCSV);

export default router;
