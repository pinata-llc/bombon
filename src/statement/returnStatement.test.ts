import test from 'ava';

import {Scope} from "../scope";
import {Literal} from "../expression/literal";
import {ReturnStatement} from "./returnStatement";

const scope = new Scope("function");

test("return;", (t) => {
  new ReturnStatement(null).eval(scope);
  t.is(scope.returnVal, undefined);
  t.true(scope.broken);
});

test("return 123;", (t) => {
  new ReturnStatement(new Literal(123)).eval(scope);
  t.is(scope.returnVal, 123);
  t.true(scope.broken);
});

