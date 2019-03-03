import test from 'ava';

import {Identifier} from "./identifier";
import {Scope} from "../scope";

test("eval reads identifier from context", (t) => {
  const scope = new Scope();
  scope.set("age", 18);

  t.is(new Identifier("age").eval(scope), 18);
});
