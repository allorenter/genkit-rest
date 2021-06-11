import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import handleErrors from './middleware/handle-errors';

// routes
import generatedDataRouter from './modules/generated-data/generated-data.routes';
import userRouter from './modules/user/user.routes';
import dataSchemaRouter from './modules/data-schema/data-schema.routes';

const app = express();

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use('/api/generated-data', generatedDataRouter);
app.use('/api/user', userRouter);
app.use('/api/data-schema', dataSchemaRouter);

app.use(handleErrors);

// prueba de conexión a la base de datos
const { MONGODB_URL } = process.env;
console.log('mongo URI', MONGODB_URL);
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a %s', MONGODB_URL);
    console.log('Press CTRL + C to stop the process. \n');
  })
  .catch((err) => {
    console.error('App starting error:', err.message);
    process.exit(1);
  });

export default app;
