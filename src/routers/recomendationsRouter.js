import { Router } from 'express';
import * as recomendationsController from '../controllers/recomendationsController';

const router = new Router();

router.post('', recomendationsController.insertRecomendation);
router.post('/:id/upvote', recomendationsController.upvoteRecomendation);
router.post('/:id/downvote', recomendationsController.downvoteRecomendation);
router.get('/random', recomendationsController.getRandomRecomendation);

export default router;
