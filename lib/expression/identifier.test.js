"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = __importDefault(require("ava"));
var scope_1 = require("../scope");
var identifier_1 = require("./identifier");
ava_1.default("eval reads identifier from context", function (t) {
    var scope = new scope_1.Scope();
    scope.set("age", 18);
    t.is(new identifier_1.Identifier("age").eval(scope), 18);
});
