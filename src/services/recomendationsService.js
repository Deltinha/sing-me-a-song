import validateRecomendationSyntax from '../validations/recomendationValidation';
import * as recomendationsRepository from '../repositories/recomendationsRepository';
import SyntaxError from '../errors/syntaxError';
import NotFoundError from '../errors/notFoundError';

export async function insertRecomendation({ name, youtubeLink }) {
  if (!validateRecomendationSyntax({ name, youtubeLink })) {
    throw new SyntaxError('Entrada inválida');
  }

  await recomendationsRepository.insertRecomendation({ name, youtubeLink });
}

export async function upvoteRecomendation(id) {
  await recomendationsRepository.upvoteRecomendation(id);
}

export function idTypeValidation(id) {
  if (Number.isNaN(Number(id))) {
    throw new SyntaxError('Identificador inválido');
  }
  return true;
}

export async function recomendationExists(id) {
  const recomendation = await recomendationsRepository.getRecomendationById(id);
  if (!recomendation) {
    throw new NotFoundError('Essa recomendação não existe');
  }

  return recomendation;
}

export async function downvoteRecomendation({ id, score }) {
  if (score === -5) {
    await recomendationsRepository.removeRecomendation(id);
  } else {
    await recomendationsRepository.downvoteRecomendation(id);
  }
}

export async function getRandomRecomendation() {
  function getRandomInt(n) {
    return Math.floor(Math.random() * n);
  }

  const recomendations = await recomendationsRepository.getAllRecomendations();
  if (recomendations.length === 0) {
    throw new NotFoundError('Não existem recomedações');
  }

  const randomN = Math.random();
  const aboveTenScore = recomendations.filter((song) => song.score > 10);
  const belowTenScore = recomendations.filter((song) => song.score <= 10);

  if (randomN < 0.7 && aboveTenScore.length > 0) {
    return aboveTenScore[getRandomInt(aboveTenScore.length)];
  }
  if (randomN >= 0.7 && belowTenScore.length > 0) {
    return belowTenScore[getRandomInt(belowTenScore.length)];
  }

  return recomendations[getRandomInt(recomendations.length)];
}

export async function getTopRecomendations(amount) {
  const recomendations = await recomendationsRepository.getTopRecomendations(
    amount
  );
  if (!recomendations) {
    throw new NotFoundError('Não existem recomendações');
  }

  return recomendations;
}
