import SyntaxError from '../errors/syntaxError';
import * as recommendationsService from '../services/recommendationsService';

export async function insertRecommendation(req, res, next) {
  const { name, youtubeLink } = req.body;

  try {
    if (typeof name !== 'string' || typeof youtubeLink !== 'string') {
      throw new SyntaxError('Entrada inválida');
    }

    await recommendationsService.insertRecommendation({
      name,
      youtubeLink,
    });

    return res.sendStatus(201);
  } catch (error) {
    if (error.name === 'SyntaxError') {
      return res.status(400).send(error.message);
    }
    return next(error);
  }
}

export async function upvoteRecommendation(req, res, next) {
  const { id } = req.params;
  try {
    await recommendationsService.upvoteRecommendation(id);

    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
}

export async function downvoteRecommendation(req, res, next) {
  try {
    await recommendationsService.downvoteRecommendation(
      res.locals.recommendation
    );

    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
}

export async function getRandomRecommendation(req, res, next) {
  try {
    const recommendation =
      await recommendationsService.getRandomRecommendation();

    return res.send(recommendation).status(200);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(404).send(error.message);
    }
    return next(error);
  }
}

export async function getTopRecommendations(req, res, next) {
  const { amount } = req.params;
  try {
    const recommendations = await recommendationsService.getTopRecommendations(
      amount
    );

    return res.send(recommendations).status(200);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(404).send(error.message);
    }
    return next(error);
  }
}
