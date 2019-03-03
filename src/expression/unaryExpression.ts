import { ASTNode, ASTParam } from "../ast";
import { UnknownUnaryOperator } from "../error/unknownUnaryOperator";
import { Scope } from "../scope";
import { Expression } from "./expression";

export type UnaryOperator = "!" | "-" | "+";

@ASTNode
export class UnaryExpression extends Expression<any> {
  constructor(
    @ASTParam("operator")
    protected operator: UnaryOperator,
    @ASTParam("argument")
    protected argument: Expression<any>,
  ) {
    super();
  }

  public eval(scope: Scope) {
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
