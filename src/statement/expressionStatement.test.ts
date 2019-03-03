import test from 'ava';

import {Scope} from "../scope";
import {Literal} from "../expression/literal";
import {ExpressionStatement} from "./expressionStatement";

const scope = new Scope();

test("evaluates the expression", (t) => {
  t.is(new ExpressionStatement(new Literal("Hi!")).eval(scope), "Hi!");
});
