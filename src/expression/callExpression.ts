import {Expression} from "./expression";
import {ASTNode, ASTParam} from "../ast";
import {Scope} from "../scope";

@ASTNode
export class CallExpression extends Expression<any> {

  constructor (
    @ASTParam("callee")
    protected callee: Expression<Function>,

    @ASTParam("arguments")
    protected _arguments: Array<Expression<any>>
  ) {
    super();
  }

  eval(scope: Scope): any {
    const fn = this.callee.eval(scope);
    const args = [];

    for (const arg of this._arguments) {
      args.push(arg.eval(scope));
    }

    return fn.apply(null, args);
  }
}
