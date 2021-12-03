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
  return !!recomendation;
}
