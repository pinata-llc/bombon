import test from "ava";

import {Scope} from "../scope";
import {ArrowFunctionExpression} from "./arrowFunctionExpression";
import {Literal} from "./literal";
import {BinaryExpression} from "./binaryExpression";
import {Identifier} from "./identifier";
import {BlockStatement} from "../statement/blockStatement";
import {ReturnStatement} from "../statement/returnStatement";

const scope = new Scope();

test(`() => "Hi"`, (t) => {
  t.is(new ArrowFunctionExpression([], new Literal("Hi")).eval(scope)(), "Hi");
});

test(`(x) => x * x`, (t) => {
  t.is(new ArrowFunctionExpression(
    [new Identifier("x")],
    new BinaryExpression(new Identifier("x"), "*", new Identifier("x"))
  ).eval(scope)(5), 25);
});

test(`(a, b) => { return a + b; }`, (t) => {
  t.is(new ArrowFunctionExpression(
    [new Identifier("a"), new Identifier("b")],
    new BlockStatement([
      new ReturnStatement(
        new BinaryExpression(new Identifier("a"), "+", new Identifier("b"))
      )
    ])
  ).eval(scope)(20, 30), 50);
});

