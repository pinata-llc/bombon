import { ASTNode, ASTParam } from "../ast";
import { Scope } from "../scope";
import { BlockStatement } from "../statement/blockStatement";
import { Expression } from "./expression";
import { Identifier } from "./identifier";

@ASTNode
export class ArrowFunctionExpression extends Expression<(...p: any) => any> {
  constructor(
    @ASTParam("params")
    protected params: Identifier[],
    @ASTParam("body")
    protected body: BlockStatement | Expression<any>,
  ) {
    super();
  }

  public eval(scope: Scope): any {
    const { params, body } = this;

    // tslint:disable-next-line:only-arrow-functions
    return function() {
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
