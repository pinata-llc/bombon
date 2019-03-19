"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = __importDefault(require("ava"));
var literal_1 = require("../expression/literal");
var scope_1 = require("../scope");
var returnStatement_1 = require("./returnStatement");
var scope = new scope_1.Scope("function");
ava_1.default("return;", function (t) {
    new returnStatement_1.ReturnStatement(null).eval(scope);
    t.is(scope.returnVal, undefined);
    t.true(scope.broken);
});
ava_1.default("return 123;", function (t) {
    new returnStatement_1.ReturnStatement(new literal_1.Literal(123)).eval(scope);
    t.is(scope.returnVal, 123);
    t.true(scope.broken);
});
