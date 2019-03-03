import { ASTNode, ASTParam } from "../ast";
import { Expression } from "../expression/expression";
import { Scope } from "../scope";
import { Statement } from "./statement";

@ASTNode
export class ExpressionStatement extends Statement {
  constructor(
    @ASTParam("expression")
    protected expression: Expression<any>,
  ) {
    super();
  }

  public eval(scope: Scope) {
    this.expression.eval(scope);
  }
}
