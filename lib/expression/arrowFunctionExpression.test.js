"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = __importDefault(require("ava"));
var scope_1 = require("../scope");
var blockStatement_1 = require("../statement/blockStatement");
var returnStatement_1 = require("../statement/returnStatement");
var arrowFunctionExpression_1 = require("./arrowFunctionExpression");
var binaryExpression_1 = require("./binaryExpression");
var identifier_1 = require("./identifier");
var literal_1 = require("./literal");
var scope = new scope_1.Scope();
ava_1.default("() => \"Hi\"", function (t) {
    t.is(new arrowFunctionExpression_1.ArrowFunctionExpression([], new literal_1.Literal("Hi")).eval(scope)(), "Hi");
});
ava_1.default("(x) => x * x", function (t) {
    t.is(new arrowFunctionExpression_1.ArrowFunctionExpression([new identifier_1.Identifier("x")], new binaryExpression_1.BinaryExpression(new identifier_1.Identifier("x"), "*", new identifier_1.Identifier("x"))).eval(scope)(5), 25);
});
ava_1.default("(a, b) => { return a + b; }", function (t) {
    t.is(new arrowFunctionExpression_1.ArrowFunctionExpression([new identifier_1.Identifier("a"), new identifier_1.Identifier("b")], new blockStatement_1.BlockStatement([new returnStatement_1.ReturnStatement(new binaryExpression_1.BinaryExpression(new identifier_1.Identifier("a"), "+", new identifier_1.Identifier("b")))])).eval(scope)(20, 30), 50);
});
