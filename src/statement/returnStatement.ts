import {ASTNode, ASTParam} from "../ast";
import {Statement} from "./statement";
import {Expression} from "../expression/expression";
import {Scope} from "../scope";

@ASTNode
export class ReturnStatement extends Statement {

  constructor(
    @ASTParam("argument")
    protected argument: Expression<any> | null
  ) {
    super();
  }

  eval(scope: Scope) {
    scope.break("function", this.argument ? this.argument.eval(scope) : undefined);
  }
}
