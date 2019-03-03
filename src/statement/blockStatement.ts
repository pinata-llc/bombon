import { ASTNode, ASTParam } from "../ast";
import { Scope } from "../scope";
import { Statement } from "./statement";

@ASTNode
export class BlockStatement extends Statement {
  constructor(
    @ASTParam("body")
    protected body: Statement[],
  ) {
    super();
  }

  public eval(scope: Scope) {
    for (const statement of this.body) {
      statement.eval(scope);
      if (scope.broken) {
        break;
      }
    }
  }
}
