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
var scope_1 = require("../scope");
var blockStatement_1 = require("./blockStatement");
var statement_1 = require("./statement");
var scope = new scope_1.Scope("function");
ava_1.default("evaluates all statements", function (t) {
    var fake = sinon_1.default.fake();
    var fake2 = sinon_1.default.fake();
    var MyStatement = /** @class */ (function (_super) {
        __extends(MyStatement, _super);
        function MyStatement() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MyStatement.prototype.eval = function () {
            fake();
        };
        return MyStatement;
    }(statement_1.Statement));
    var MyStatement2 = /** @class */ (function (_super) {
        __extends(MyStatement2, _super);
        function MyStatement2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MyStatement2.prototype.eval = function () {
            fake2();
        };
        return MyStatement2;
    }(statement_1.Statement));
    new blockStatement_1.BlockStatement([new MyStatement(), new MyStatement2()]).eval(scope);
    t.true(fake.calledOnce);
    t.true(fake2.calledOnce);
    t.true(fake2.calledAfter(fake));
});
ava_1.default("early block end", function (t) {
    var fake = sinon_1.default.fake();
    var fake2 = sinon_1.default.fake();
    var MyStatement = /** @class */ (function (_super) {
        __extends(MyStatement, _super);
        function MyStatement() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MyStatement.prototype.eval = function (st1) {
            fake();
            st1.break("function", null);
        };
        return MyStatement;
    }(statement_1.Statement));
    var MyStatement2 = /** @class */ (function (_super) {
        __extends(MyStatement2, _super);
        function MyStatement2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MyStatement2.prototype.eval = function () {
            fake2();
        };
        return MyStatement2;
    }(statement_1.Statement));
    new blockStatement_1.BlockStatement([new MyStatement(), new MyStatement2()]).eval(scope);
    t.true(fake.calledOnce);
    t.false(fake2.called);
});
