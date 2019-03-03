import {ASTNode, ASTParam} from "../ast";
import {Expression} from "./expression";
import {BlockStatement} from "../statement/blockStatement";
import {Scope} from "../scope";
import {Identifier} from "./identifier";

@ASTNode
export class ArrowFunctionExpression extends Expression<Function> {

  constructor (
    @ASTParam("params")
    protected params: Array<Identifier>,

    @ASTParam("body")
    protected body: BlockStatement | Expression<any>
  ) {
    super();
  }

  eval(scope: Scope): any {
    const { params, body } = this;

    return function () {
      const fnScope = scope.child("function");

      for (let i = 0, l = params.length; i < l; i++) {
        fnScope.set(params[i].name, arguments[i]);
      }

      if (body instanceof Expression) {
        return body.eval(fnScope);
      }

      body.eval(fnScope);
      return fnScope.returnVal;
    };
  }
}
