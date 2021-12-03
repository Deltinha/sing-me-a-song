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
