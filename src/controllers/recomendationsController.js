import SyntaxError from '../errors/syntaxError';
import * as recomendationsService from '../services/recomendationsService';

export async function insertRecomendation(req, res, next) {
  const { name, youtubeLink } = req.body;

  try {
    if (typeof name !== 'string' || typeof youtubeLink !== 'string') {
      throw new SyntaxError('Entrada inválida');
    }

    await recomendationsService.insertRecomendation({
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

export async function upvoteRecomendation(req, res, next) {
  const { id } = req.params;
  try {
    if (Number.isNaN(Number(id))) {
      throw new SyntaxError('Identificador inválido');
    }

    await recomendationsService.recomendationExists(id);

    await recomendationsService.upvoteRecomendation(id);

    return res.sendStatus(200);
  } catch (error) {
    if (error.name === 'SyntaxError') {
      return res.status(400).send(error.message);
    }
    if (error.name === 'NotFoundError') {
      return res.status(404).send(error.message);
    }
    return next(error);
  }
}

export async function downvoteRecomendation(req, res) {
  const { id } = req.params;
  const recomendation = await recomendationsService.recomendationExists(id);
  if (!recomendation) return res.sendStatus(404);

  await recomendationsService.downvoteRecomendation(recomendation);

  return res.sendStatus(200);
}

export async function getRandomRecomendation(req, res) {
  const recomendation = await recomendationsService.getRandomRecomendation();
  if (!recomendation) return res.sendStatus(404);
  return res.send(recomendation).status(200);
}

export async function getTopRecomendations(req, res) {
  const { amount } = req.params;
  const recomendations = await recomendationsService.getTopRecomendations(
    amount
  );
  if (!recomendations) return res.sendStatus(404);
  return res.send(recomendations).status(200);
}
