import express from 'express';
import getPersistentData from './persistent-data.repository';

const router = express.Router();

router.get('/get', async (req, res, next) => res.send({ data: await getPersistentData() }));

export default router;
