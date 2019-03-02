import {Expression} from "./expression";
import {ASTNode, ASTParam} from "../ast";
import {BombonError} from "../error";

export type BinaryOperator = "==" | "!=" | "===" | "!==" | "<" | "<=" | ">" | ">=" | "+" | "-" | "*" | "/" | "%";
export type BinaryOpValue = any;

@ASTNode
export class BinaryExpression extends Expression<BinaryOpValue> {

  constructor (
    @ASTParam("left")
    protected left: Expression<BinaryOpValue>,

    @ASTParam("operator")
    protected operator: BinaryOperator,

    @ASTParam("right")
    protected right: Expression<BinaryOpValue>
  ) {
    super();
  }

  eval() {
    const left = this.left.eval();
    const right = this.right.eval();

    switch (this.operator) {
      case "==":
        return left == right;
      case "!=":
        return left != right;
      case "===":
        return left === right;
      case "!==":
        return left !== right;
      case "<":
        return left < right;
      case "<=":
        return left <= right;
      case ">":
        return left > right;
      case ">=":
        return left >= right;
      case "+":
        return left + right;
      case "-":
        return left - right;
      case "*":
        return left * right;
      case "/":
        return left / right;
      case "%":
        return left % right;

      default:
        throw new UnknownBinaryOperator(this.operator);
    }
  }
}

export class UnknownBinaryOperator extends BombonError {
  constructor(public operator: string) {
    super(`Unknown binary operator: \`${operator}\``);
  }
}
