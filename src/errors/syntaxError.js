export default class SyntaxError extends Error {
  constructor(message) {
    super(message);
    this.name = 'SyntaxError';
  }
}
