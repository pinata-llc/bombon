import {ASTNode, ASTParam} from "../ast";
import {Expression} from "./expression";
import {Scope} from "../scope";

@ASTNode
export class Literal<E> extends Expression<E> {

  constructor(
    @ASTParam("value")
    protected value: E
  ) {
    super();
  }

  eval(scope: Scope) {
    return this.value;
  }
}
