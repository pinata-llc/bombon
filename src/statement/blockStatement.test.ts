import test from 'ava';

import {Scope} from "../scope";
import {BlockStatement} from "./blockStatement";
import {Statement} from "./statement";
import sinon from 'sinon';

const scope = new Scope("function");

test("evaluates all statements", (t) => {
  const fake = sinon.fake();
  const fake2 = sinon.fake();

  class MyStatement extends Statement {
    eval() {
      fake();
    }
  }

  class MyStatement2 extends Statement {
    eval() {
      fake2();
    }
  }

  new BlockStatement([
    new MyStatement(),
    new MyStatement2(),
  ]).eval(scope);

  t.true(fake.calledOnce);
  t.true(fake2.calledOnce);
  t.true(fake2.calledAfter(fake));
});

test("early block end", (t) => {
  const fake = sinon.fake();
  const fake2 = sinon.fake();

  class MyStatement extends Statement {
    eval(scope: Scope) {
      fake();
      scope.break("function", null);
    }
  }

  class MyStatement2 extends Statement {
    eval() {
      fake2();
    }
  }

  new BlockStatement([
    new MyStatement(),
    new MyStatement2(),
  ]).eval(scope);

  t.true(fake.calledOnce);
  t.false(fake2.called);
});
