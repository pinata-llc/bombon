import {ASTNode, ASTParam} from "../ast";
import {Expression} from "./expression";
import {BombonError} from "../error";

export type UnaryOperator = "!" | "-" | "+";

@ASTNode
export class UnaryExpression extends Expression<any> {
  constructor(
    @ASTParam("operator")
    protected operator: UnaryOperator,

    @ASTParam("argument")
    protected argument: Expression<any>
  ) {
    super();
  }

  eval() {
    switch (this.operator) {
      case "!":
        return !this.argument.eval();
      case "-":
        return -this.argument.eval();
      case "+":
        return +this.argument.eval();
      default:
        throw new UnknownUnaryOperator(this.operator);
    }
  }
}

export class UnknownUnaryOperator extends BombonError {
  constructor(public operator: string) {
    super(`Unknown Unary operator: \`${operator}\``);
  }
}
