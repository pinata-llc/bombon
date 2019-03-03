import test from 'ava';

import {Scope} from "../scope";
import {Literal} from "../expression/literal";
import {LogicalExpression} from "../expression/logicalExpression";
import {IfStatement} from "./ifStatement";
import {BlockStatement} from "./blockStatement";
import {ExpressionStatement} from "./expressionStatement";

const scope = new Scope();

const trueTest = new LogicalExpression(new Literal(true), "||", new Literal(false));
const falseTest = new LogicalExpression(new Literal(true), "&&", new Literal(false));

const consequent = new BlockStatement([
  new ExpressionStatement(new Literal("true!"))
]);

const alternate = new BlockStatement([
  new ExpressionStatement(new Literal("false!"))
]);

test("true test", (t) => {
  const ifS = new IfStatement(trueTest, consequent);
  t.deepEqual(ifS.eval(scope), ["true!"]);
});

test("false test", (t) => {
  const ifS = new IfStatement(falseTest, consequent);
  t.falsy(ifS.eval(scope));
});

test("true test with alternate", (t) => {
  const ifS = new IfStatement(
    trueTest,
    consequent,
    alternate
  );

  t.deepEqual(ifS.eval(scope), ["true!"]);
});

test("false test with alternate", (t) => {
  const ifS = new IfStatement(
    falseTest,
    consequent,
    alternate
  );

  t.deepEqual(ifS.eval(scope), ["false!"]);
});
