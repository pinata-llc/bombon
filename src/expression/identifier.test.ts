import test from "ava";

import { Scope } from "../scope";
import { Identifier } from "./identifier";

test("eval reads identifier from context", t => {
  const scope = new Scope();
  scope.set("age", 18);

  t.is(new Identifier("age").eval(scope), 18);
});
