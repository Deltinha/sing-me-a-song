import * as recomendationsService from '../services/recomendationsService';

export default async function idValidation(req, res, next) {
  const { id } = req.params;
  try {
    recomendationsService.idTypeValidation(id);

    const recomendation = await recomendationsService.recomendationExists(id);
    res.locals.recomendation = recomendation;

    return next();
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
