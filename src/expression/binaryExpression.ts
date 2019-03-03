import { ASTNode, ASTParam } from "../ast";
import { UnknownBinaryOperator } from "../error/unknownBinaryOperator";
import { Scope } from "../scope";
import { Expression } from "./expression";

export type BinaryOperator = "==" | "!=" | "===" | "!==" | "<" | "<=" | ">" | ">=" | "+" | "-" | "*" | "/" | "%";
export type BinaryOpValue = any;

@ASTNode
export class BinaryExpression extends Expression<BinaryOpValue> {
  constructor(
    @ASTParam("left")
    protected left: Expression<BinaryOpValue>,
    @ASTParam("operator")
    protected operator: BinaryOperator,
    @ASTParam("right")
    protected right: Expression<BinaryOpValue>,
  ) {
    super();
  }

  public eval(scope: Scope) {
    const left = this.left.eval(scope);
    const right = this.right.eval(scope);

    switch (this.operator) {
      case "==":
        // tslint:disable-next-line:triple-equals
        return left == right;
      case "!=":
        // tslint:disable-next-line:triple-equals
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
