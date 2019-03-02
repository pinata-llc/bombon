import {ASTNode, ASTParam} from "../ast";
import {Expression} from "./expression";

@ASTNode
export class Literal<E> extends Expression<E> {

  constructor(
    @ASTParam("value")
    protected value: E
  ) {
    super();
  }

  eval() {
    return this.value;
  }
}
