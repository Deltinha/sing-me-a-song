import { Router } from 'express';
import * as recommendationsController from '../controllers/recommendationsController';
import idValidation from '../middlewares/idValidation';

const router = new Router();

router.post('', recommendationsController.insertRecommendation);
router.post(
  '/:id/upvote',
  idValidation,
  recommendationsController.upvoteRecommendation
);
router.post(
  '/:id/downvote',
  idValidation,
  recommendationsController.downvoteRecommendation
);
router.get('/random', recommendationsController.getRandomRecommendation);
router.get('/top/:amount', recommendationsController.getTopRecommendations);

export default router;
