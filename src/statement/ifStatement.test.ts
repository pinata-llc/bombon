import anyTest, { TestInterface } from "ava";
import sinon from "sinon";

import { Literal } from "../expression/literal";
import { Scope } from "../scope";
import { BlockStatement } from "./blockStatement";
import { IfStatement } from "./ifStatement";
import { Statement } from "./statement";

const test = anyTest as TestInterface<{
  scope: Scope;
  consequent: Statement;
  alternate: Statement;
  consequentFake: sinon.SinonSpy;
  alternateFake: sinon.SinonSpy;
}>;

test.beforeEach(({ context: ctx }) => {
  ctx.scope = new Scope();
  ctx.consequentFake = sinon.fake();
  ctx.alternateFake = sinon.fake();

  ctx.consequent = new BlockStatement([
    new (class extends Statement {
      public eval() {
        ctx.consequentFake();
      }
    })(),
  ]);

  ctx.alternate = new (class extends Statement {
    public eval() {
      ctx.alternateFake();
    }
  })();
});

const trueTest = new Literal(true);
const falseTest = new Literal(false);

test("true test", t => {
  new IfStatement(trueTest, t.context.consequent).eval(t.context.scope);
  t.true(t.context.consequentFake.calledOnce);
  t.false(t.context.alternateFake.called);
});

test("false test", t => {
  new IfStatement(falseTest, t.context.consequent).eval(t.context.scope);
  t.false(t.context.alternateFake.called);
  t.false(t.context.consequentFake.called);
});

test("true test with alternate", t => {
  new IfStatement(trueTest, t.context.consequent, t.context.alternate).eval(t.context.scope);
  t.true(t.context.consequentFake.calledOnce);
  t.false(t.context.alternateFake.called);
});

test("false test with alternate", t => {
  new IfStatement(falseTest, t.context.consequent, t.context.alternate).eval(t.context.scope);
  t.true(t.context.alternateFake.calledOnce);
  t.false(t.context.consequentFake.called);
});
