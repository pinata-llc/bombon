import {ASTNode, ASTParam} from "../ast";
import {Statement} from "./statement";
import {LogicalExpression} from "../expression/logicalExpression";

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

  eval() {
    if (this.test.eval()) {
      return this.consequent.eval();
    } else if (this.alternate) {
      return this.alternate.eval();
    }
  }
}