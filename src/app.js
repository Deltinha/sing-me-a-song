import './setup';
import express from 'express';
import cors from 'cors';

import recomendationsRouter from './routers/recomendationsRouter';
import errorHandler from './errorHandler';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/recomendations', recomendationsRouter);

app.use(errorHandler);

export default app;
