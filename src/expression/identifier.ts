import {ASTNode, ASTParam} from "../ast";
import {Context} from "../context";
import {Expression} from "./expression";

@ASTNode
export class Identifier<E = any> extends Expression<E> {

  constructor(
    @ASTParam("name")
    public name: string,

    protected ctx: Context,
  ) {
    super();
  }

  eval() {
    return this.ctx.get(this.name);
  }
}
