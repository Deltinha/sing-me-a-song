import * as recommendationsService from '../services/recommendationsService';

export default async function idValidation(req, res, next) {
  const { id } = req.params;
  try {
    recommendationsService.idTypeValidation(id);

    const recommendation = await recommendationsService.recommendationExists(
      id
    );
    res.locals.recommendation = recommendation;

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
