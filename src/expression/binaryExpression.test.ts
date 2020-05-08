import test, { Macro } from "ava";

import { UnknownBinaryOperator } from "../error/unknownBinaryOperator";
import { Scope } from "../scope";
import { BinaryExpression, BinaryOperator, BinaryOpValue } from "./binaryExpression";
import { Literal } from "./literal";

const scope = new Scope();

const macro: Macro<[BinaryOpValue, BinaryOperator, BinaryOpValue, BinaryOpValue]> = (t, a, o, b, e) => {
  const expression = new BinaryExpression(new Literal(a), o, new Literal(b));
  t.is(expression.eval(scope), e);
};

const formatLiteral = (val: BinaryOpValue) => {
  if (typeof val === "string") {
    return `"${val}"`;
  }

  if (typeof val === "object") {
    return JSON.stringify(val);
  }

  return val.toString();
};

macro.title = (providedTitle = "", a, o, b, e) =>
  `${providedTitle} ${formatLiteral(a)} ${o} ${formatLiteral(b)} == ${e}`;

// Equality
test(macro, 2, "==", 2, true);
test(macro, 2, "==", 1, false);
test(macro, 2, "==", "2", true);
test(macro, 2, "==", "a", false);
test(macro, "a", "==", "a", true);

// Inequality
test(macro, 2, "!=", 2, false);
test(macro, 2, "!=", 1, true);
test(macro, 2, "!=", "2", false);
test(macro, 2, "!=", "a", true);
test(macro, "a", "!=", "a", false);

// Identity / Strict equality
test(macro, 2, "===", 2, true);
test(macro, 2, "===", 1, false);
test(macro, 2, "===", "2", false);
test(macro, 2, "===", "a", false);
test(macro, "a", "===", "a", true);
test(macro, {}, "===", {}, false);

// Non-identity / Strict inequality
test(macro, 2, "!==", 2, false);
test(macro, 2, "!==", 1, true);
test(macro, 2, "!==", "2", true);
test(macro, 2, "!==", "a", true);
test(macro, "a", "!==", "a", false);
test(macro, {}, "!==", {}, true);

// Less than
test(macro, 2, "<", 1, false);
test(macro, 1, "<", 2, true);

// Less than or equals
test(macro, 2, "<=", 1, false);
test(macro, 2, "<=", 2, true);
test(macro, 2, "<=", 3, true);

// Greater than
test(macro, 1, ">", 2, false);
test(macro, 2, ">", 1, true);

// Greater than or equals
test(macro, 2, ">=", 1, true);
test(macro, 2, ">=", 2, true);
test(macro, 2, ">=", 3, false);

// Addition
test(macro, 1, "+", 1, 2);
test(macro, 10, "+", -20, -10);

// Subtraction
test(macro, 2, "-", 1, 1);

// Multiplication
test(macro, 5, "*", 5, 25);

// Division
test(macro, 30, "/", 12, 2.5);

// Modulo
test(macro, 7, "%", 2, 1);

// Unknown operator
test("throws error when passing an unknown operator", t => {
  t.throws(
    () => {
      new BinaryExpression(new Literal(1), ">>%" as any, new Literal(2)).eval(scope);
    },
    { instanceOf: UnknownBinaryOperator },
  );
});
