import {ASTNode, ASTParam} from "../ast";
import {Statement} from "./statement";

@ASTNode
export class BlockStatement extends Statement {
  constructor(
    @ASTParam("body")
    protected body: Array<Statement>
  ) {
    super();
  }

  eval() {
    const results = [];

    for (const statement of this.body) {
      results.push(statement.eval());
    }

    return results;
  }
}
