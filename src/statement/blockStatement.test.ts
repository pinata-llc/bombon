import test from 'ava';

import {BlockStatement} from "./blockStatement";
import {Literal} from "../expression/literal";
import {ExpressionStatement} from "./expressionStatement";
import {LogicalExpression} from "../expression/logicalExpression";

test("evaluates all statements", (t) => {
  const bs = new BlockStatement([
    new ExpressionStatement(new Literal("Hi!")),
    new ExpressionStatement(new LogicalExpression(new Literal(true), "||", new Literal(false)))
  ]);

  t.deepEqual(bs.eval(), ["Hi!", true]);
});
