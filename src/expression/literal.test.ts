import test from 'ava';

import {Literal} from "./literal";
import {Scope} from "../scope";

const scope = new Scope();

test("literal eval", (t) => {
  t.is(new Literal(true).eval(scope), true);
  t.is(new Literal("Hello World").eval(scope), "Hello World");
});
