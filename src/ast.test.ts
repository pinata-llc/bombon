import test from "ava";
import { Parser } from "acorn";
import {build, UnknownNodeType} from "./ast";

import "./expression/logicalExpression";
import "./expression/binaryExpression";
import "./expression/unaryExpression";
import "./expression/literal";
import "./expression/identifier";
import "./expression/memberExpression";
import "./expression/callExpression";
import "./expression/arrowFunctionExpression";
import "./statement/expressionStatement";
import "./statement/blockStatement";
import "./statement/ifStatement";
import "./statement/returnStatement";
import "./program";

import {Scope} from "./scope";

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
    
    if (!raining) {
      log("Enjoy your rain-free day!"); 
    } 
    
    log("It's " + (-20) + " degrees outside");
    
    log(friends.map(f => f + " is my friend")); 
    
    // Early return 
    log(friends.find((f) => {
      if (f === "Tom") {
        return true;
      }
      
      return null;
    }));
  `);

  const scope = new Scope();

  scope.set("step", {
    "details": {
      "key": "setup"
    }
  });

  const log: Array<string> = [];

  scope.set("log", (message: string) => {
    log.push(message);
  });

  scope.set("friends", ["Tom", "Pedro"]);
  scope.set("raining", false);

  build(programAst).eval(scope);

  t.snapshot(log.join('\n'));
});

test("throws on unknown node type", (t) => {
  t.throws(() => {
    build({
      type: "BullS#1tStatement"
    });
  }, UnknownNodeType);
});
