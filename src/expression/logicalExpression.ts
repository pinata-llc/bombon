import { ASTNode, ASTParam } from "../ast";
import { Scope } from "../scope";
import { Expression } from "./expression";

export type LogicalOperator = "||" | "&&";

@ASTNode
export class LogicalExpression extends Expression<boolean> {
  constructor(
    @ASTParam("left")
    protected left: Expression<boolean>,
    @ASTParam("operator")
    protected operator: LogicalOperator,
    @ASTParam("right")
    protected right: Expression<boolean>,
  ) {
    super();
  }

  public eval(scope: Scope) {
    if (this.operator === "||") {
      return this.left.eval(scope) || this.right.eval(scope);
    } else {
      return this.left.eval(scope) && this.right.eval(scope);
    }
  }
}
