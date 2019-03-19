"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = __importDefault(require("ava"));
var scope_1 = require("../scope");
var literal_1 = require("./literal");
var scope = new scope_1.Scope();
ava_1.default("literal eval", function (t) {
    t.is(new literal_1.Literal(true).eval(scope), true);
    t.is(new literal_1.Literal("Hello World").eval(scope), "Hello World");
});
