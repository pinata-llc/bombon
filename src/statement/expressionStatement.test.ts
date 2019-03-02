import test from 'ava';

import {Literal} from "../expression/literal";
import {ExpressionStatement} from "./expressionStatement";

test("evaluates the expression", (t) => {
  t.is(new ExpressionStatement(new Literal("Hi!")).eval(), "Hi!");
});
