import test from "ava";

import { Scope } from "../scope";
import { Identifier } from "./identifier";
import { Literal } from "./literal";
import { MemberExpression } from "./memberExpression";

const scope = new Scope();
scope.set("a", {
  aa: 1,
  b: {
    bb: 2,
  },
});

test("a['aa']", t => {
  const expr = new MemberExpression(new Identifier("a"), new Literal("aa"));
  t.is(expr.eval(scope), 1);
});

test("a.aa", t => {
  const expr = new MemberExpression(new Identifier("a"), new Identifier("aa"));
  t.is(expr.eval(scope), 1);
});

test("a.b.bb", t => {
  const expr = new MemberExpression(
    new MemberExpression(new Identifier("a"), new Identifier("b")),
    new Identifier("bb"),
  );
  t.is(expr.eval(scope), 2);
});
