import test from "ava";
import { Parser } from "acorn";
import { build } from "./ast";

import "./expression/logicalExpression";
import "./expression/literal";
import "./statement/expressionStatement";
import "./statement/blockStatement";
import "./statement/ifStatement";
import "./program";

test("build", (t) => {
  const program = Parser.parse(`
    true && false;
    true || true;
    
    if (false) {
      1;
    } else {
      if (true) {
        2;
      }
    } 
  `);

  console.log(build(program).eval());

  t.pass();
});