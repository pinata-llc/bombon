export class BombonError extends Error {
  constructor(message: string) {
    super(`Bombon: ${message}`);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
