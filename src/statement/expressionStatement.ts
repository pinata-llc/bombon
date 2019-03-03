import {ASTNode, ASTParam} from "../ast";
import {Statement} from "./statement";
import {Expression} from "../expression/expression";
import {Scope} from "../scope";

@ASTNode
export class ExpressionStatement extends Statement {

  constructor(
    @ASTParam("expression")
    protected expression: Expression<any>
  ) {
    super();
  }

  eval(scope: Scope) {
    return this.expression.eval(scope);
  }
}
