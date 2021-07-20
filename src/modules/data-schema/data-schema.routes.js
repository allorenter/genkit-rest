import express from 'express';
import DataSchemaController from './data-schema.controller';
import isAuth from '../../middleware/auth';

const router = express.Router();

router.post('/save', isAuth, DataSchemaController.saveDataSchema);

router.get('/get', isAuth, DataSchemaController.getDataSchemas);

router.delete('/delete/:id', isAuth, DataSchemaController.deleteDataSchema);

export default router;
