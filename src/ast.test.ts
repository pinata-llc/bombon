import test from "ava";
import { Parser } from "acorn";
import { build } from "./ast";

import "./expression/logicalExpression";
import "./expression/binaryExpression";
import "./expression/unaryExpression";
import "./expression/literal";
import "./expression/identifier";
import "./expression/memberExpression";
import "./expression/callExpression";
import "./statement/expressionStatement";
import "./statement/blockStatement";
import "./statement/ifStatement";
import "./program";

import {Context} from "./context";

test("build", (t) => {
  const programAst = Parser.parse(`
    true;
    true && false;
    true || true;
    
    if (false) {
      1;
    } else {
      if (true) {
        2;
      }
    } 

    if (2 > 1) {
      '2 is greater than 1';
    }
    
    step.details.key;
    step.details['ke' + 'y'];
    friends[0];
    friends[0 + 1];
    
    log("I can call functions now!"); 
    console.log("Hello", "World!");
    
    if (!raining) {
      log("Enjoy your rain-free day!"); 
    } 
    
    log("It's " + (-20) + " degrees outside");
  `);

  const ctx = new Context();

  ctx.set("step", {
    "details": {
      "key": "setup"
    }
  });

  ctx.set("log", (message: string) => {
    console.log(message);
  });

  ctx.set("console", {
    log: (message1: string, message2: string) => {
      console.log(message1, message2)
    }
  });

  ctx.set("friends", ["Tom", "Pedro"]);

  ctx.set("raining", false);

  const program = build(programAst, ctx).eval();
  console.log(program);

  t.pass();
});
