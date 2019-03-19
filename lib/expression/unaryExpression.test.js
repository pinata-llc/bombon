"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = __importDefault(require("ava"));
var unknownUnaryOperator_1 = require("../error/unknownUnaryOperator");
var scope_1 = require("../scope");
var literal_1 = require("./literal");
var unaryExpression_1 = require("./unaryExpression");
var scope = new scope_1.Scope();
var macro = function (t, o, a, e) {
    var expression = new unaryExpression_1.UnaryExpression(o, new literal_1.Literal(a));
    t.is(expression.eval(scope), e);
};
macro.title = function (providedTitle, o, a, e) {
    if (providedTitle === void 0) { providedTitle = ""; }
    return providedTitle + " " + o + a + " == " + e;
};
// NOT (!)
ava_1.default(macro, "!", true, false);
ava_1.default(macro, "!", false, true);
ava_1.default(macro, "!", null, true);
ava_1.default(macro, "!", undefined, true);
ava_1.default(macro, "!", "", true);
// -
ava_1.default(macro, "-", 10, -10);
// +
ava_1.default(macro, "+", 10, 10);
ava_1.default(macro, "+", -10, -10);
// Unknown operator
ava_1.default("throws error when passing an unknown operator", function (t) {
    t.throws(function () {
        new unaryExpression_1.UnaryExpression(">>%", new literal_1.Literal(2)).eval(scope);
    }, unknownUnaryOperator_1.UnknownUnaryOperator);
});
