"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = __importDefault(require("ava"));
var sinon_1 = __importDefault(require("sinon"));
var scope_1 = require("../scope");
var callExpression_1 = require("./callExpression");
var literal_1 = require("./literal");
var scope = new scope_1.Scope();
ava_1.default("calls the function", function (t) {
    var fn = sinon_1.default.fake();
    var callExpr = new callExpression_1.CallExpression(new literal_1.Literal(fn), []);
    t.false(fn.called);
    callExpr.eval(scope);
    t.true(fn.called);
});
ava_1.default("passes the arguments", function (t) {
    var fn = sinon_1.default.fake();
    var callExpr = new callExpression_1.CallExpression(new literal_1.Literal(fn), [new literal_1.Literal(1), new literal_1.Literal(2), new literal_1.Literal(3)]);
    t.false(fn.called);
    callExpr.eval(scope);
    t.true(fn.calledWith(1, 2, 3));
});
