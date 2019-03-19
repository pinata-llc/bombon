"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var acorn_1 = require("acorn");
var ava_1 = __importDefault(require("ava"));
var ast_1 = require("./ast");
var unknownNodeType_1 = require("./error/unknownNodeType");
var scope_1 = require("./scope");
require("./expression/arrowFunctionExpression");
require("./expression/binaryExpression");
require("./expression/callExpression");
require("./expression/identifier");
require("./expression/literal");
require("./expression/logicalExpression");
require("./expression/memberExpression");
require("./expression/unaryExpression");
require("./program");
require("./statement/blockStatement");
require("./statement/expressionStatement");
require("./statement/ifStatement");
require("./statement/returnStatement");
ava_1.default("build", function (t) {
    var programAst = acorn_1.Parser.parse("\n    true;\n    true && false;\n    true || true;\n    \n    if (false) {\n      1;\n    } else {\n      if (true) {\n        2;\n      }\n    } \n\n    if (2 > 1) {\n      '2 is greater than 1';\n    }\n    \n    step.details.key;\n    step.details['ke' + 'y'];\n    friends[0];\n    friends[0 + 1];\n    \n    log(\"I can call functions now!\"); \n    \n    if (!raining) {\n      log(\"Enjoy your rain-free day!\"); \n    } \n    \n    log(\"It's \" + (-20) + \" degrees outside\");\n    \n    log(friends.map(f => f + \" is my friend\")); \n    \n    // Early return \n    log(friends.find((f) => {\n      if (f === \"Tom\") {\n        return true;\n      }\n      \n      return null;\n    }));\n  ");
    var scope = new scope_1.Scope();
    scope.set("step", {
        details: {
            key: "setup",
        },
    });
    var log = [];
    scope.set("log", function (message) {
        log.push(message);
    });
    scope.set("friends", ["Tom", "Pedro"]);
    scope.set("raining", false);
    ast_1.build(programAst).eval(scope);
    t.snapshot(log.join("\n"));
});
ava_1.default("throws on unknown node type", function (t) {
    t.throws(function () {
        ast_1.build({
            type: "BullS#1tStatement",
        });
    }, unknownNodeType_1.UnknownNodeType);
});
