export default class RecomendationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RecomendationError';
  }
}
