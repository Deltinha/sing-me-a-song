import './setup';
import express from 'express';
import cors from 'cors';

import recomendationsRouter from './routers/recomendationsRouter';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/recomendations', recomendationsRouter);

export default app;
