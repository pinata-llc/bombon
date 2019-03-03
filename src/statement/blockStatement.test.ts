import test from "ava";

import sinon from "sinon";
import { Scope } from "../scope";
import { BlockStatement } from "./blockStatement";
import { Statement } from "./statement";

const scope = new Scope("function");

test("evaluates all statements", t => {
  const fake = sinon.fake();
  const fake2 = sinon.fake();

  class MyStatement extends Statement {
    public eval() {
      fake();
    }
  }

  class MyStatement2 extends Statement {
    public eval() {
      fake2();
    }
  }

  new BlockStatement([new MyStatement(), new MyStatement2()]).eval(scope);

  t.true(fake.calledOnce);
  t.true(fake2.calledOnce);
  t.true(fake2.calledAfter(fake));
});

test("early block end", t => {
  const fake = sinon.fake();
  const fake2 = sinon.fake();

  class MyStatement extends Statement {
    public eval(st1: Scope) {
      fake();
      st1.break("function", null);
    }
  }

  class MyStatement2 extends Statement {
    public eval() {
      fake2();
    }
  }

  new BlockStatement([new MyStatement(), new MyStatement2()]).eval(scope);

  t.true(fake.calledOnce);
  t.false(fake2.called);
});
