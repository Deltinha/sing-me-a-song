import { Router } from 'express';
import * as recomendationsController from '../controllers/recomendationsController';

const router = new Router();

router.post(recomendationsController.insertRecomendation);
router.post('/:id/upvote', recomendationsController.upvoteSong);

export default router;
