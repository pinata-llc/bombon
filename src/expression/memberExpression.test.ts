import test from "ava";

import { MemberExpression } from "./memberExpression";
import {Identifier} from "./identifier";
import {Literal} from "./literal";
import {Context} from "../context";

const ctx = new Context();
ctx.set("a", {
  aa: 1,
  b: {
    bb: 2
  }
});

test("a['aa']", (t) => {
  const expr = new MemberExpression(new Identifier("a", ctx), new Literal("aa"));
  t.is(expr.eval(), 1);
});

test("a.aa", (t) => {
  const expr = new MemberExpression(new Identifier("a", ctx), new Identifier("aa", ctx));
  t.is(expr.eval(), 1);
});

test("a.b.bb", (t) => {
  const expr = new MemberExpression(
    new MemberExpression(new Identifier("a", ctx), new Identifier("b", ctx)),
    new Identifier("bb", ctx)
  );
  t.is(expr.eval(), 2);
});
