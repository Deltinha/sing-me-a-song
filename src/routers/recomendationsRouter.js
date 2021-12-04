import { Router } from 'express';
import * as recomendationsController from '../controllers/recomendationsController';
import idValidation from '../middlewares/idValidation';

const router = new Router();

router.post('', recomendationsController.insertRecomendation);
router.post(
  '/:id/upvote',
  idValidation,
  recomendationsController.upvoteRecomendation
);
router.post(
  '/:id/downvote',
  idValidation,
  recomendationsController.downvoteRecomendation
);
router.get('/random', recomendationsController.getRandomRecomendation);
router.get('/top/:amount', recomendationsController.getTopRecomendations);

export default router;
