import { BombonError } from "./index";

export class UnknownUnaryOperator extends BombonError {
  constructor(public operator: string) {
    super(`Unknown Unary operator: \`${operator}\``);
  }
}
