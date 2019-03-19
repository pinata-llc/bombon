"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = __importDefault(require("ava"));
var scope_1 = require("../scope");
var identifier_1 = require("./identifier");
var literal_1 = require("./literal");
var memberExpression_1 = require("./memberExpression");
var scope = new scope_1.Scope();
scope.set("a", {
    aa: 1,
    b: {
        bb: 2,
    },
});
ava_1.default("a['aa']", function (t) {
    var expr = new memberExpression_1.MemberExpression(new identifier_1.Identifier("a"), new literal_1.Literal("aa"));
    t.is(expr.eval(scope), 1);
});
ava_1.default("a.aa", function (t) {
    var expr = new memberExpression_1.MemberExpression(new identifier_1.Identifier("a"), new identifier_1.Identifier("aa"));
    t.is(expr.eval(scope), 1);
});
ava_1.default("a.b.bb", function (t) {
    var expr = new memberExpression_1.MemberExpression(new memberExpression_1.MemberExpression(new identifier_1.Identifier("a"), new identifier_1.Identifier("b")), new identifier_1.Identifier("bb"));
    t.is(expr.eval(scope), 2);
});
