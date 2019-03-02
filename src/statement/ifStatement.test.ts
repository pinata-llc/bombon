import test from 'ava';

import {IfStatement} from "./ifStatement";
import {BlockStatement} from "./blockStatement";
import {Literal} from "../expression/literal";
import {ExpressionStatement} from "./expressionStatement";
import {LogicalExpression} from "../expression/logicalExpression";

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
  t.deepEqual(ifS.eval(), ["true!"]);
});

test("false test", (t) => {
  const ifS = new IfStatement(falseTest, consequent);
  t.falsy(ifS.eval());
});

test("true test with alternate", (t) => {
  const ifS = new IfStatement(
    trueTest,
    consequent,
    alternate
  );

  t.deepEqual(ifS.eval(), ["true!"]);
});

test("false test with alternate", (t) => {
  const ifS = new IfStatement(
    falseTest,
    consequent,
    alternate
  );

  t.deepEqual(ifS.eval(), ["false!"]);
});