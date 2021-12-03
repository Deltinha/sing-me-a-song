import validateRecomendationSyntax from '../validations/recomendationValidation';
import * as recomendationsRepository from '../repositories/recomendationsRepository';

export async function insertRecomendation({ name, youtubeLink }) {
  if (!validateRecomendationSyntax({ name, youtubeLink })) {
    return false;
  }

  await recomendationsRepository.insertRecomendation({ name, youtubeLink });
  return true;
}

export async function upvoteRecomendation(id) {
  await recomendationsRepository.upvoteRecomendation(id);
}

export async function recomendationExists(id) {
  const recomendation = await recomendationsRepository.getRecomendationById(id);
  if (!recomendation) return false;
  return recomendation;
}

export async function downvoteRecomendation({ id, score }) {
  if (score === -5) {
    await recomendationsRepository.removeRecomendation(id);
  } else {
    await recomendationsRepository.downvoteRecomendation(id);
  }
}

function getRandomInt(n) {
  return Math.floor(Math.random() * n);
}

export async function getRandomRecomendation() {
  const recomendations = await recomendationsRepository.getAllRecomendations();
  if (recomendations.length === 0) {
    return false;
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
  if (!recomendations) return false;
  return recomendations;
}
