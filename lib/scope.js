"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Scope = /** @class */ (function () {
    function Scope(type, parent) {
        if (type === void 0) { type = "program"; }
        this.type = type;
        this.parent = parent;
        this.broken = false;
        this.values = {};
    }
    Scope.prototype.hasOwn = function (name) {
        return name in this.values;
    };
    Scope.prototype.get = function (name) {
        return (this.findScopeWith(name) || this).values[name];
    };
    Scope.prototype.set = function (name, value) {
        (this.findScopeWith(name) || this).values[name] = value;
    };
    Scope.prototype.child = function (type) {
        return new Scope(type, this);
    };
    Scope.prototype.break = function (type, value) {
        this.broken = true;
        if (type === this.type) {
            this.returnVal = value;
        }
        else if (this.parent) {
            this.parent.break(type, value);
        }
    };
    Scope.prototype.findScopeWith = function (name) {
        var scope = this;
        while (scope && !scope.hasOwn(name)) {
            scope = scope.parent;
        }
        return scope;
    };
    return Scope;
}());
exports.Scope = Scope;
