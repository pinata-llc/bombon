import test from "ava";
import sinon from "sinon";

import { Expression } from "../expression/expression";
import { Scope } from "../scope";
import { ExpressionStatement } from "./expressionStatement";

const scope = new Scope();

test("evaluates the expression", t => {
  const fn = sinon.fake();

  class MyExpression extends Expression<void> {
    public eval() {
      fn();
    }
  }

  new ExpressionStatement(new MyExpression()).eval(scope);
  t.true(fn.calledOnce);
});
