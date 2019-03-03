import { ASTNode, ASTParam } from "../ast";
import { Scope } from "../scope";
import { Expression } from "./expression";

@ASTNode
export class CallExpression extends Expression<any> {
  constructor(
    @ASTParam("callee")
    protected callee: Expression<(...p: any) => any>,
    @ASTParam("arguments")
    protected args: Array<Expression<any>>,
  ) {
    super();
  }

  public eval(scope: Scope): any {
    const fn = this.callee.eval(scope);
    const args = [];

    for (const arg of this.args) {
      args.push(arg.eval(scope));
    }

    return fn.apply(null, args);
  }
}
