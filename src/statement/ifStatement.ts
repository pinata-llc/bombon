import {ASTNode, ASTParam} from "../ast";
import {Statement} from "./statement";
import {LogicalExpression} from "../expression/logicalExpression";
import {Scope} from "../scope";

@ASTNode
export class IfStatement extends Statement {
  constructor(
    @ASTParam("test")
    protected test: LogicalExpression,

    @ASTParam("consequent")
    protected consequent: Statement,

    @ASTParam("alternate")
    protected alternate?: Statement
  ) {
    super();
  }

  eval(scope: Scope) {
    if (this.test.eval(scope)) {
      return this.consequent.eval(scope.child());
    } else if (this.alternate) {
      return this.alternate.eval(scope.child());
    }
  }
}
