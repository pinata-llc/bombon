import test from "ava";
import sinon from "sinon";
import { Scope } from "../scope";
import { CallExpression } from "./callExpression";
import { Literal } from "./literal";

const scope = new Scope();

test("calls the function", t => {
  const fn = sinon.fake();
  const callExpr = new CallExpression(new Literal(fn), []);
  t.false(fn.called);
  callExpr.eval(scope);
  t.true(fn.called);
});

test("passes the arguments", t => {
  const fn = sinon.fake();
  const callExpr = new CallExpression(new Literal(fn), [new Literal(1), new Literal(2), new Literal(3)]);
  t.false(fn.called);
  callExpr.eval(scope);
  t.true(fn.calledWith(1, 2, 3));
});
