import { BombonError } from "./index";

export class UnknownBinaryOperator extends BombonError {
  constructor(public operator: string) {
    super(`Unknown binary operator: \`${operator}\``);
  }
}
