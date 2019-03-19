"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = __importDefault(require("ava"));
var unknownBinaryOperator_1 = require("../error/unknownBinaryOperator");
var scope_1 = require("../scope");
var binaryExpression_1 = require("./binaryExpression");
var literal_1 = require("./literal");
var scope = new scope_1.Scope();
var macro = function (t, a, o, b, e) {
    var expression = new binaryExpression_1.BinaryExpression(new literal_1.Literal(a), o, new literal_1.Literal(b));
    t.is(expression.eval(scope), e);
};
var formatLiteral = function (val) {
    if (typeof val === "string") {
        return "\"" + val + "\"";
    }
    if (typeof val === "object") {
        return JSON.stringify(val);
    }
    return val.toString();
};
macro.title = function (providedTitle, a, o, b, e) {
    if (providedTitle === void 0) { providedTitle = ""; }
    return providedTitle + " " + formatLiteral(a) + " " + o + " " + formatLiteral(b) + " == " + e;
};
// Equality
ava_1.default(macro, 2, "==", 2, true);
ava_1.default(macro, 2, "==", 1, false);
ava_1.default(macro, 2, "==", "2", true);
ava_1.default(macro, 2, "==", "a", false);
ava_1.default(macro, "a", "==", "a", true);
// Inequality
ava_1.default(macro, 2, "!=", 2, false);
ava_1.default(macro, 2, "!=", 1, true);
ava_1.default(macro, 2, "!=", "2", false);
ava_1.default(macro, 2, "!=", "a", true);
ava_1.default(macro, "a", "!=", "a", false);
// Identity / Strict equality
ava_1.default(macro, 2, "===", 2, true);
ava_1.default(macro, 2, "===", 1, false);
ava_1.default(macro, 2, "===", "2", false);
ava_1.default(macro, 2, "===", "a", false);
ava_1.default(macro, "a", "===", "a", true);
ava_1.default(macro, {}, "===", {}, false);
// Non-identity / Strict inequality
ava_1.default(macro, 2, "!==", 2, false);
ava_1.default(macro, 2, "!==", 1, true);
ava_1.default(macro, 2, "!==", "2", true);
ava_1.default(macro, 2, "!==", "a", true);
ava_1.default(macro, "a", "!==", "a", false);
ava_1.default(macro, {}, "!==", {}, true);
// Less than
ava_1.default(macro, 2, "<", 1, false);
ava_1.default(macro, 1, "<", 2, true);
// Less than or equals
ava_1.default(macro, 2, "<=", 1, false);
ava_1.default(macro, 2, "<=", 2, true);
ava_1.default(macro, 2, "<=", 3, true);
// Greater than
ava_1.default(macro, 1, ">", 2, false);
ava_1.default(macro, 2, ">", 1, true);
// Greater than or equals
ava_1.default(macro, 2, ">=", 1, true);
ava_1.default(macro, 2, ">=", 2, true);
ava_1.default(macro, 2, ">=", 3, false);
// Addition
ava_1.default(macro, 1, "+", 1, 2);
ava_1.default(macro, 10, "+", -20, -10);
// Subtraction
ava_1.default(macro, 2, "-", 1, 1);
// Multiplication
ava_1.default(macro, 5, "*", 5, 25);
// Division
ava_1.default(macro, 30, "/", 12, 2.5);
// Modulo
ava_1.default(macro, 7, "%", 2, 1);
// Unknown operator
ava_1.default("throws error when passing an unknown operator", function (t) {
    t.throws(function () {
        new binaryExpression_1.BinaryExpression(new literal_1.Literal(1), ">>%", new literal_1.Literal(2)).eval(scope);
    }, unknownBinaryOperator_1.UnknownBinaryOperator);
});
