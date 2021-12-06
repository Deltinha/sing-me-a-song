import './setup';
import express from 'express';
import cors from 'cors';

import recommendationsRouter from './routers/recommendationsRouter';
import errorHandler from './middlewares/errorHandler';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/recommendations', recommendationsRouter);

app.use(errorHandler);

export default app;
