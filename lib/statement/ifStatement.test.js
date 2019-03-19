"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = __importDefault(require("ava"));
var sinon_1 = __importDefault(require("sinon"));
var literal_1 = require("../expression/literal");
var scope_1 = require("../scope");
var blockStatement_1 = require("./blockStatement");
var ifStatement_1 = require("./ifStatement");
var statement_1 = require("./statement");
var test = ava_1.default;
test.beforeEach(function (_a) {
    var ctx = _a.context;
    ctx.scope = new scope_1.Scope();
    ctx.consequentFake = sinon_1.default.fake();
    ctx.alternateFake = sinon_1.default.fake();
    ctx.consequent = new blockStatement_1.BlockStatement([
        new /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1.prototype.eval = function () {
                ctx.consequentFake();
            };
            return class_1;
        }(statement_1.Statement))(),
    ]);
    ctx.alternate = new /** @class */ (function (_super) {
        __extends(class_2, _super);
        function class_2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_2.prototype.eval = function () {
            ctx.alternateFake();
        };
        return class_2;
    }(statement_1.Statement))();
});
var trueTest = new literal_1.Literal(true);
var falseTest = new literal_1.Literal(false);
test("true test", function (t) {
    new ifStatement_1.IfStatement(trueTest, t.context.consequent).eval(t.context.scope);
    t.true(t.context.consequentFake.calledOnce);
    t.false(t.context.alternateFake.called);
});
test("false test", function (t) {
    new ifStatement_1.IfStatement(falseTest, t.context.consequent).eval(t.context.scope);
    t.false(t.context.alternateFake.called);
    t.false(t.context.consequentFake.called);
});
test("true test with alternate", function (t) {
    new ifStatement_1.IfStatement(trueTest, t.context.consequent, t.context.alternate).eval(t.context.scope);
    t.true(t.context.consequentFake.calledOnce);
    t.false(t.context.alternateFake.called);
});
test("false test with alternate", function (t) {
    new ifStatement_1.IfStatement(falseTest, t.context.consequent, t.context.alternate).eval(t.context.scope);
    t.true(t.context.alternateFake.calledOnce);
    t.false(t.context.consequentFake.called);
});
