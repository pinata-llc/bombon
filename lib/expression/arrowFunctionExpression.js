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
var ast_1 = require("../ast");
var expression_1 = require("./expression");
var ArrowFunctionExpression = /** @class */ (function (_super) {
    __extends(ArrowFunctionExpression, _super);
    function ArrowFunctionExpression(params, body) {
        var _this = _super.call(this) || this;
        _this.params = params;
        _this.body = body;
        return _this;
    }
    ArrowFunctionExpression.prototype.eval = function (scope) {
        var _a = this, params = _a.params, body = _a.body;
        // tslint:disable-next-line:only-arrow-functions
        return function () {
            var fnScope = scope.child("function");
            for (var i = 0, l = params.length; i < l; i++) {
                fnScope.set(params[i].name, arguments[i]);
            }
            if (body instanceof expression_1.Expression) {
                return body.eval(fnScope);
            }
            body.eval(fnScope);
            return fnScope.returnVal;
        };
    };
    ArrowFunctionExpression = __decorate([
        ast_1.ASTNode,
        __param(0, ast_1.ASTParam("params")),
        __param(1, ast_1.ASTParam("body")),
        __metadata("design:paramtypes", [Array, Object])
    ], ArrowFunctionExpression);
    return ArrowFunctionExpression;
}(expression_1.Expression));
exports.ArrowFunctionExpression = ArrowFunctionExpression;
