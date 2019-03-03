import { ASTNode, ASTParam } from "../ast";
import { Expression } from "../expression/expression";
import { Scope } from "../scope";
import { Statement } from "./statement";

@ASTNode
export class ReturnStatement extends Statement {
  constructor(
    @ASTParam("argument")
    protected argument: Expression<any> | null,
  ) {
    super();
  }

  public eval(scope: Scope) {
    scope.break("function", this.argument ? this.argument.eval(scope) : undefined);
  }
}
