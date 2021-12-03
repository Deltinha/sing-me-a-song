import validateRecomendationSyntax from '../schemas/recomendationSchema';
import * as recomendationsRepository from '../repositories/recomendationsRepository';

export async function insertRecomendation({ name, youtubeLink }) {
  if (!validateRecomendationSyntax({ name, youtubeLink })) {
    return false;
  }

  await recomendationsRepository.insertRecomendation({ name, youtubeLink });
  return true;
}
