import testAny, {TestInterface} from "ava";

import { Scope } from "./scope";

const test = testAny as TestInterface<{ parent: Scope, child: Scope, grandchild: Scope }>;

test.beforeEach((t) => {
  t.context.parent = new Scope("program");
  t.context.parent.set("session", 123);
  t.context.child = t.context.parent.child("function");
  t.context.child.set("message", "Hello");
  t.context.grandchild = t.context.child.child("if");
});

test("hasOwn", (t) => {
  t.true(t.context.child.hasOwn("message"));
  t.false(t.context.child.hasOwn("session"));
  t.false(t.context.child.hasOwn("notThere"));
});

test("get", (t) => {
  t.is(t.context.parent.get("session"), 123);
  t.is(t.context.child.get("session"), 123);
  t.falsy(t.context.child.get("whatever"));
});

test("set", (t) => {
  t.context.child.set("session", 321);
  t.is(t.context.parent.get("session"), 321);
  t.false(t.context.child.hasOwn("session"));
});

test("break: ", (t) => {
  t.context.grandchild.break("function", 30);
  t.true(t.context.grandchild.broken);
  t.is(t.context.grandchild.returnVal, undefined);

  t.true(t.context.child.broken);
  t.is(t.context.child.returnVal, 30);

  t.false(t.context.parent.broken);
  t.is(t.context.parent.returnVal, undefined);
});
