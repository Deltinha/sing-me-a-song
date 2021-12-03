import * as recomendationsService from '../src/services/recomendationsService';
import * as recomendationsRepository from '../src/repositories/recomendationsRepository';
import validateRecomendationSyntax from '../src/validations/recomendationValidation';

jest.mock('../src/validations/recomendationValidation');

describe('insert recomendations tests', () => {
  it('should return true if input is valid and recomendation inserted', async () => {
    validateRecomendationSyntax.mockReturnValueOnce(true);
    jest
      .spyOn(recomendationsRepository, 'insertRecomendation')
      .mockReturnValueOnce(true);

    const result = await recomendationsService.insertRecomendation({
      name: '',
      youtubeLink: '',
    });
    expect(result).toEqual(true);
  });

  it('should return false if input is invalid', async () => {
    validateRecomendationSyntax.mockReturnValueOnce(false);

    const result = await recomendationsService.insertRecomendation({
      name: '',
      youtubeLink: '',
    });
    expect(result).toEqual(false);
  });
});

describe('downvote tests', () => {});
