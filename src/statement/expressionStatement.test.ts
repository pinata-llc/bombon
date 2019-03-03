import test from 'ava';
import sinon from 'sinon';

import {Scope} from "../scope";
import {ExpressionStatement} from "./expressionStatement";
import {Expression} from "../expression/expression";

const scope = new Scope();

test("evaluates the expression", (t) => {
  const fn = sinon.fake();

  class MyExpression extends Expression<void> {
    eval(scope: Scope) {
      fn();
    }
  }

  new ExpressionStatement(new MyExpression()).eval(scope);
  t.true(fn.calledOnce);
});
