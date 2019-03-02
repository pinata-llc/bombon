import {Node} from "../node";
import {ASTNode, ASTParam} from "../ast";

@ASTNode
export class Literal<E> extends Node<E> {

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
