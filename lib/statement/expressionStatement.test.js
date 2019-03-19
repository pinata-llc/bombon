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
var expression_1 = require("../expression/expression");
var scope_1 = require("../scope");
var expressionStatement_1 = require("./expressionStatement");
var scope = new scope_1.Scope();
ava_1.default("evaluates the expression", function (t) {
    var fn = sinon_1.default.fake();
    var MyExpression = /** @class */ (function (_super) {
        __extends(MyExpression, _super);
        function MyExpression() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MyExpression.prototype.eval = function () {
            fn();
        };
        return MyExpression;
    }(expression_1.Expression));
    new expressionStatement_1.ExpressionStatement(new MyExpression()).eval(scope);
    t.true(fn.calledOnce);
});
