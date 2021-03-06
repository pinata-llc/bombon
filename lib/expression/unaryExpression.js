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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnaryExpression = void 0;
var ast_1 = require("../ast");
var unknownUnaryOperator_1 = require("../error/unknownUnaryOperator");
var expression_1 = require("./expression");
var UnaryExpression = /** @class */ (function (_super) {
    __extends(UnaryExpression, _super);
    function UnaryExpression(operator, argument) {
        var _this = _super.call(this) || this;
        _this.operator = operator;
        _this.argument = argument;
        return _this;
    }
    UnaryExpression.prototype.eval = function (scope) {
        switch (this.operator) {
            case "!":
                return !this.argument.eval(scope);
            case "-":
                return -this.argument.eval(scope);
            case "+":
                return +this.argument.eval(scope);
            default:
                throw new unknownUnaryOperator_1.UnknownUnaryOperator(this.operator);
        }
    };
    UnaryExpression = __decorate([
        ast_1.ASTNode,
        __param(0, ast_1.ASTParam("operator")),
        __param(1, ast_1.ASTParam("argument")),
        __metadata("design:paramtypes", [String, expression_1.Expression])
    ], UnaryExpression);
    return UnaryExpression;
}(expression_1.Expression));
exports.UnaryExpression = UnaryExpression;
