import test from 'ava';

import {Identifier} from "./identifier";
import {Context} from "../context";

test("eval reads identifier from context", (t) => {
  const ctx = new Context();
  ctx.set("age", 18);

  t.is(new Identifier("age", ctx).eval(), 18);
});
