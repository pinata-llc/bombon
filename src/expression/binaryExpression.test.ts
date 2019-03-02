import test, {Macro} from 'ava';

import {BinaryExpression, BinaryOperator, BinaryOpValue} from "./binaryExpression";
import {Literal} from "./literal";

const macro: Macro<[BinaryOpValue, BinaryOperator, BinaryOpValue, BinaryOpValue]> = (t, a, o, b, e) => {
  const expression = new BinaryExpression(new Literal(a), o, new Literal(b));
  t.is(expression.eval(), e);
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