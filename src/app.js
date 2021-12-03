import './setup';
import express from 'express';
import cors from 'cors';

import * as recomendationsController from './controllers/recomendationsController';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.sendStatus(200));

app.post('/recomendations', recomendationsController.insertRecomendation);

export default app;
