import {Expression} from "./expression";
import {ASTNode, ASTParam} from "../ast";

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

  eval(): any {
    const fn = this.callee.eval();
    const args = [];

    for (const arg of this._arguments) {
      args.push(arg.eval());
    }

    return fn.apply(null, args);
  }
}
