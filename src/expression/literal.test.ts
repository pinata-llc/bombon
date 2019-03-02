import test from 'ava';

import {Literal} from "./literal";

test("literal eval", (t) => {
  t.is(new Literal(true).eval(), true);
  t.is(new Literal("Hello World").eval(), "Hello World");
});
