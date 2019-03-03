import test from 'ava';

import {Scope} from "../scope";
import {Literal} from "../expression/literal";
import {LogicalExpression} from "../expression/logicalExpression";
import {BlockStatement} from "./blockStatement";
import {ExpressionStatement} from "./expressionStatement";

const scope = new Scope();

test("evaluates all statements", (t) => {
  const bs = new BlockStatement([
    new ExpressionStatement(new Literal("Hi!")),
    new ExpressionStatement(new LogicalExpression(new Literal(true), "||", new Literal(false)))
  ]);

  t.deepEqual(bs.eval(scope), ["Hi!", true]);
});
