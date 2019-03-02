import {Expression} from "./expression";
import {ASTNode, ASTParam} from "../ast";

export type LogicalOperator = "||" | "&&";

@ASTNode
export class LogicalExpression extends Expression<boolean> {

  constructor (
    @ASTParam("left")
    protected left: Expression<boolean>,

    @ASTParam("operator")
    protected operator: LogicalOperator,

    @ASTParam("right")
    protected right: Expression<boolean>
  ) {
    super();
  }

  eval() {
    if (this.operator === "||") {
      return this.left.eval() || this.right.eval();
    } else {
      return this.left.eval() && this.right.eval();
    }
  }
}