import test, { Macro } from "ava";

import { UnknownUnaryOperator } from "../error/unknownUnaryOperator";
import { Scope } from "../scope";
import { Literal } from "./literal";
import { UnaryExpression, UnaryOperator } from "./unaryExpression";

const scope = new Scope();

const macro: Macro<[UnaryOperator, any, any]> = (t, o, a, e) => {
  const expression = new UnaryExpression(o, new Literal(a));
  t.is(expression.eval(scope), e);
};

macro.title = (providedTitle = "", o, a, e) => `${providedTitle} ${o}${a} == ${e}`;

// NOT (!)
test(macro, "!", true, false);
test(macro, "!", false, true);
test(macro, "!", null, true);
test(macro, "!", undefined, true);
test(macro, "!", "", true);

// -
test(macro, "-", 10, -10);

// +
test(macro, "+", 10, 10);
test(macro, "+", -10, -10);

// Unknown operator
test("throws error when passing an unknown operator", t => {
  t.throws(
    () => {
      new UnaryExpression(">>%" as any, new Literal(2)).eval(scope);
    },
    { instanceOf: UnknownUnaryOperator },
  );
});
