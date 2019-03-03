import { ASTNode, ASTParam } from "../ast";
import { Scope } from "../scope";
import { Expression } from "./expression";

@ASTNode
export class Identifier<E = any> extends Expression<E> {
  constructor(
    @ASTParam("name")
    public name: string,
  ) {
    super();
  }

  public eval(scope: Scope) {
    return scope.get(this.name);
  }
}
