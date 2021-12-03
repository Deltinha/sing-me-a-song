import * as recomendationsService from '../services/recomendationsService';

export async function insertRecomendation(req, res) {
  const { name, youtubeLink } = req.body;
  if (typeof name !== 'string' || typeof youtubeLink !== 'string') {
    res.sendStatus(400);
  }

  const result = await recomendationsService.insertRecomendation({
    name,
    youtubeLink,
  });

  if (result) return res.sendStatus(201);
  return res.sendStatus(400);
}
