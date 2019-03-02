import {ASTNode, ASTParam} from "../ast";
import {Statement} from "./statement";
import {Expression} from "../expression/expression";

@ASTNode
export class ExpressionStatement extends Statement {

  constructor(
    @ASTParam("expression")
    protected expression: Expression<any>
  ) {
    super();
  }

  eval() {
    return this.expression.eval();
  }
}
