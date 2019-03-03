import {ASTNode, ASTParam} from "../ast";
import {Expression} from "./expression";
import {BombonError} from "../error";
import {Scope} from "../scope";

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

  eval(scope: Scope) {
    switch (this.operator) {
      case "!":
        return !this.argument.eval(scope);
      case "-":
        return -this.argument.eval(scope);
      case "+":
        return +this.argument.eval(scope);
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
