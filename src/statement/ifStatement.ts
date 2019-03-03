import {ASTNode, ASTParam} from "../ast";
import {Expression} from "../expression/expression";
import {Scope} from "../scope";
import {Statement} from "./statement";

@ASTNode
export class IfStatement extends Statement {
  constructor(
    @ASTParam("test")
    protected test: Expression<boolean>,

    @ASTParam("consequent")
    protected consequent: Statement,

    @ASTParam("alternate")
    protected alternate?: Statement
  ) {
    super();
  }

  eval(scope: Scope) {
    if (this.test.eval(scope)) {
      this.consequent.eval(scope.child("if"));
    } else if (this.alternate) {
      this.alternate.eval(scope.child("if"));
    }
  }
}
