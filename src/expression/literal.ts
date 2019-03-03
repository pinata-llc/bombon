import { ASTNode, ASTParam } from "../ast";
import { Scope } from "../scope";
import { Expression } from "./expression";

@ASTNode
export class Literal<E> extends Expression<E> {
  constructor(
    @ASTParam("value")
    protected value: E,
  ) {
    super();
  }

  public eval(scope: Scope) {
    return this.value;
  }
}
