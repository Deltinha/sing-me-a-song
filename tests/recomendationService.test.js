import * as recomendationsService from '../src/services/recomendationsService';
import * as recomendationsRepository from '../src/repositories/recomendationsRepository';
import validateRecomendationSyntax from '../src/validations/recomendationValidation';
import SyntaxError from '../src/errors/syntaxError';
import NotFoundError from '../src/errors/notFoundError';

jest.mock('../src/validations/recomendationValidation');

describe('insert recomendations tests', () => {
  it('should throw SyntaxError if input is valid', async () => {
    validateRecomendationSyntax.mockReturnValueOnce(false);

    const promise = recomendationsService.insertRecomendation({
      name: '',
      youtubeLink: '',
    });
    await expect(promise).rejects.toThrow(SyntaxError);
  });
  it('should resolve if the insertion was successful', async () => {
    validateRecomendationSyntax.mockReturnValueOnce(true);
    jest
      .spyOn(recomendationsRepository, 'insertRecomendation')
      .mockResolvedValueOnce();

    const promise = recomendationsService.insertRecomendation({
      name: '',
      youtubeLink: '',
    });
    await expect(promise).resolves.toBeUndefined();
  });
});

describe('vote related tests', () => {
  it('upvote service`s promise should resolve if the operation was successful', async () => {
    jest
      .spyOn(recomendationsRepository, 'upvoteRecomendation')
      .mockResolvedValueOnce();

    const promise = recomendationsService.upvoteRecomendation('10');
    await expect(promise).resolves.toBeUndefined();
  });

  it('should throw SyntaxError if id is not a number', () => {
    expect(() => {
      recomendationsService.idTypeValidation('word');
    }).toThrow(SyntaxError);
  });

  it('should return true if id is a number', () => {
    const result = recomendationsService.idTypeValidation('10');
    expect(result).toEqual(true);
  });

  it('should throw NotFoundError if the recomendation doesn´t exists', async () => {
    jest
      .spyOn(recomendationsRepository, 'getRecomendationById')
      .mockResolvedValueOnce(false);

    const promise = recomendationsService.recomendationExists('');
    await expect(promise).rejects.toThrow(NotFoundError);
  });

  it('should return the requested recomendation if the it exists', async () => {
    jest
      .spyOn(recomendationsRepository, 'getRecomendationById')
      .mockResolvedValueOnce('recomendation');

    const result = await recomendationsService.recomendationExists('');
    expect(result).toEqual('recomendation');
  });

  it('downvote service`s promise should resolve if the removal was successful', async () => {
    jest
      .spyOn(recomendationsRepository, 'removeRecomendation')
      .mockResolvedValueOnce(true);

    const promise = recomendationsService.downvoteRecomendation({
      id: '',
      score: -5,
    });
    await expect(promise).resolves.toBeUndefined();
  });

  it('downvote service`s promise should resolve if the donwvote operation was successful', async () => {
    jest
      .spyOn(recomendationsRepository, 'downvoteRecomendation')
      .mockResolvedValueOnce();

    const promise = recomendationsService.downvoteRecomendation({
      id: '',
      score: -4,
    });
    await expect(promise).resolves.toBeUndefined();
  });
});
