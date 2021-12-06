import validateRecommendationSyntax from '../validations/recommendationValidation';
import * as recommendationsRepository from '../repositories/recommendationsRepository';
import SyntaxError from '../errors/syntaxError';
import NotFoundError from '../errors/notFoundError';

export async function insertRecommendation({ name, youtubeLink }) {
  if (!validateRecommendationSyntax({ name, youtubeLink })) {
    throw new SyntaxError('Entrada inválida');
  }

  await recommendationsRepository.insertRecommendation({ name, youtubeLink });
}

export async function upvoteRecommendation(id) {
  await recommendationsRepository.upvoteRecommendation(id);
}

export function idTypeValidation(id) {
  if (Number.isNaN(Number(id))) {
    throw new SyntaxError('Identificador inválido');
  }
  return true;
}

export async function recommendationExists(id) {
  const recommendation = await recommendationsRepository.getRecommendationById(
    id
  );
  if (!recommendation) {
    throw new NotFoundError('Essa recomendação não existe');
  }

  return recommendation;
}

export async function downvoteRecommendation({ id, score }) {
  if (score === -5) {
    await recommendationsRepository.removeRecommendation(id);
  } else {
    await recommendationsRepository.downvoteRecommendation(id);
  }
}

export async function getRandomRecommendation() {
  function getRandomInt(n) {
    return Math.floor(Math.random() * n);
  }

  const recommendations =
    await recommendationsRepository.getAllRecommendations();
  if (recommendations.length === 0) {
    throw new NotFoundError('Não existem recomedações');
  }

  const randomN = Math.random();
  const aboveTenScore = recommendations.filter((song) => song.score > 10);
  const belowTenScore = recommendations.filter((song) => song.score <= 10);

  if (randomN < 0.7 && aboveTenScore.length > 0) {
    return aboveTenScore[getRandomInt(aboveTenScore.length)];
  }
  if (randomN >= 0.7 && belowTenScore.length > 0) {
    return belowTenScore[getRandomInt(belowTenScore.length)];
  }

  return recommendations[getRandomInt(recommendations.length)];
}

export async function getTopRecommendations(amount) {
  const recommendations = await recommendationsRepository.getTopRecommendations(
    amount
  );
  if (!recommendations) {
    throw new NotFoundError('Não existem recomendações');
  }

  return recommendations;
}
