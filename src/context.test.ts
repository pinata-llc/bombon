import test from "ava";

import { Context } from "./context";

const parent = new Context();
parent.set("session", 123);

const child = parent.child();
child.set("message", "Hello");

test("hasOwn", (t) => {
  t.true(child.hasOwn("message"));
  t.false(child.hasOwn("session"));
  t.false(child.hasOwn("notThere"));
});

test("get", (t) => {
  t.is(parent.get("session"), 123);
  t.is(child.get("session"), 123);
  t.falsy(child.get("whatever"));
});

test("set", (t) => {
  child.set("session", 321);
  t.is(parent.get("session"), 321);
  t.false(child.hasOwn("session"));
});
