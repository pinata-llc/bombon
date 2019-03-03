import {ASTNode, ASTParam} from "../ast";
import {Statement} from "./statement";
import {Scope} from "../scope";

@ASTNode
export class BlockStatement extends Statement {
  constructor(
    @ASTParam("body")
    protected body: Array<Statement>
  ) {
    super();
  }

  eval(scope: Scope) {
    const results = [];

    for (const statement of this.body) {
      results.push(statement.eval(scope));
    }

    return results;
  }
}
