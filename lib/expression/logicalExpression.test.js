"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = __importDefault(require("ava"));
var scope_1 = require("../scope");
var literal_1 = require("./literal");
var logicalExpression_1 = require("./logicalExpression");
var scope = new scope_1.Scope();
var macro = function (t, p, o, q, pq) {
    var expression = new logicalExpression_1.LogicalExpression(new literal_1.Literal(p), o, new literal_1.Literal(q));
    t.is(expression.eval(scope), pq);
};
macro.title = function (providedTitle, p, o, q, pq) {
    if (providedTitle === void 0) { providedTitle = ""; }
    return providedTitle + " " + p + " " + o + " " + q + " == " + pq;
};
ava_1.default(macro, true, "&&", true, true);
ava_1.default(macro, true, "&&", false, false);
ava_1.default(macro, false, "&&", true, false);
ava_1.default(macro, false, "&&", false, false);
ava_1.default(macro, true, "||", true, true);
ava_1.default(macro, true, "||", false, true);
ava_1.default(macro, false, "||", true, true);
ava_1.default(macro, false, "||", false, false);
