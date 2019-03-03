import test, {Macro} from 'ava';

import {Scope} from "../scope";
import {LogicalExpression, LogicalOperator} from "./logicalExpression";
import {Literal} from "./literal";

const scope = new Scope();

const macro: Macro<[boolean, LogicalOperator, boolean, boolean]> = (t, p, o, q, pq) => {
  const expression = new LogicalExpression(new Literal(p), o, new Literal(q));
  t.is(expression.eval(scope), pq);
};

macro.title = (providedTitle = "", p, o, q, pq) =>
  `${providedTitle} ${p} ${o} ${q} == ${pq}`;

test(macro, true , "&&", true , true);
test(macro, true , "&&", false, false);
test(macro, false, "&&", true , false);
test(macro, false, "&&", false, false);

test(macro, true , "||", true , true);
test(macro, true , "||", false, true);
test(macro, false, "||", true , true);
test(macro, false, "||", false, false);
