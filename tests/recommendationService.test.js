import * as recommendationsService from '../src/services/recommendationsService';
import * as recommendationsRepository from '../src/repositories/recommendationsRepository';
import validateRecommendationSyntax from '../src/validations/recommendationValidation';
import SyntaxError from '../src/errors/syntaxError';
import NotFoundError from '../src/errors/notFoundError';

jest.mock('../src/validations/recommendationValidation');

describe('insert recommendations tests', () => {
  it('should throw SyntaxError if input is valid', async () => {
    validateRecommendationSyntax.mockReturnValueOnce(false);

    const promise = recommendationsService.insertRecommendation({
      name: '',
      youtubeLink: '',
    });
    await expect(promise).rejects.toThrow(SyntaxError);
  });
  it('should resolve if the insertion was successful', async () => {
    validateRecommendationSyntax.mockReturnValueOnce(true);
    jest
      .spyOn(recommendationsRepository, 'insertRecommendation')
      .mockResolvedValueOnce();

    const promise = recommendationsService.insertRecommendation({
      name: '',
      youtubeLink: '',
    });
    await expect(promise).resolves.toBeUndefined();
  });
});

describe('vote related tests', () => {
  it('upvote service`s promise should resolve if the operation was successful', async () => {
    jest
      .spyOn(recommendationsRepository, 'upvoteRecommendation')
      .mockResolvedValueOnce();

    const promise = recommendationsService.upvoteRecommendation('10');
    await expect(promise).resolves.toBeUndefined();
  });

  it('should throw SyntaxError if id is not a number', () => {
    expect(() => {
      recommendationsService.idTypeValidation('word');
    }).toThrow(SyntaxError);
  });

  it('should return true if id is a number', () => {
    const result = recommendationsService.idTypeValidation('10');
    expect(result).toEqual(true);
  });

  it('should throw NotFoundError if the recommendation doesn´t exists', async () => {
    jest
      .spyOn(recommendationsRepository, 'getRecommendationById')
      .mockResolvedValueOnce(false);

    const promise = recommendationsService.recommendationExists('');
    await expect(promise).rejects.toThrow(NotFoundError);
  });

  it('should return the requested recommendation if the it exists', async () => {
    jest
      .spyOn(recommendationsRepository, 'getRecommendationById')
      .mockResolvedValueOnce('recommendation');

    const result = await recommendationsService.recommendationExists('');
    expect(result).toEqual('recommendation');
  });

  it('downvote service`s promise should resolve if the removal was successful', async () => {
    jest
      .spyOn(recommendationsRepository, 'removeRecommendation')
      .mockResolvedValueOnce(true);

    const promise = recommendationsService.downvoteRecommendation({
      id: '',
      score: -5,
    });
    await expect(promise).resolves.toBeUndefined();
  });

  it('downvote service`s promise should resolve if the donwvote operation was successful', async () => {
    jest
      .spyOn(recommendationsRepository, 'downvoteRecommendation')
      .mockResolvedValueOnce();

    const promise = recommendationsService.downvoteRecommendation({
      id: '',
      score: -4,
    });
    await expect(promise).resolves.toBeUndefined();
  });
});

describe('get random recommendation tests', () => {
  it('should throw NotFoundError if there aren`t any recommendations', async () => {
    jest
      .spyOn(recommendationsRepository, 'getAllRecommendations')
      .mockReturnValueOnce([]);
    const promise = recommendationsService.getRandomRecommendation();
    await expect(promise).rejects.toThrow(NotFoundError);
  });

  it('should return any recommendation if there isn`t one whose score is higher than 10', async () => {
    const recomm = [{ score: 10 }, { score: 1 }];
    jest
      .spyOn(recommendationsRepository, 'getAllRecommendations')
      .mockReturnValueOnce(recomm);
    const result = await recommendationsService.getRandomRecommendation();
    expect(recomm).toContain(result);
  });

  it('should return any recommendation if there isn`t one whose score is lower than 10', async () => {
    const recomm = [{ score: 11 }, { score: 21 }];
    jest
      .spyOn(recommendationsRepository, 'getAllRecommendations')
      .mockReturnValueOnce(recomm);
    const result = await recommendationsService.getRandomRecommendation();
    expect(recomm).toContain(result);
  });

  it('should return a recommendation whose score is greater than 10', async () => {
    const recomm = [{ score: 2 }, { score: 20 }];
    jest
      .spyOn(recommendationsRepository, 'getAllRecommendations')
      .mockReturnValueOnce(recomm);
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.69);
    const result = await recommendationsService.getRandomRecommendation();
    expect(result).toEqual({ score: 20 });
  });

  it('should return a recommendation whose score is less than 10', async () => {
    const recomm = [{ score: 2 }, { score: 20 }];
    jest
      .spyOn(recommendationsRepository, 'getAllRecommendations')
      .mockReturnValueOnce(recomm);
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.7);
    const result = await recommendationsService.getRandomRecommendation();
    expect(result).toEqual({ score: 2 });
  });
});
