import test from "ava";
import sinon from "sinon";
import {CallExpression} from "./callExpression";
import {Literal} from "./literal";

test("calls the function", (t) => {
  const fn = sinon.fake();
  const callExpr = new CallExpression(new Literal(fn), []);
  t.false(fn.called);
  callExpr.eval();
  t.true(fn.called);
});

test("passes the arguments", (t) => {
  const fn = sinon.fake();
  const callExpr = new CallExpression(new Literal(fn), [new Literal(1), new Literal(2), new Literal(3)]);
  t.false(fn.called);
  callExpr.eval();
  t.true(fn.calledWith(1, 2, 3));
});
