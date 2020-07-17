"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = exports.ASTParam = exports.ASTNode = void 0;
require("reflect-metadata");
var unknownNodeType_1 = require("./error/unknownNodeType");
var allNodeTypes = {};
function ASTNode(target) {
    allNodeTypes[target.name] = target;
}
exports.ASTNode = ASTNode;
var NODE_PARAMS_KEY = "bombon:AST:node:params";
function ASTParam(param) {
    return function (target, prop, ordinal) {
        var params = Reflect.getMetadata(NODE_PARAMS_KEY, target) || [];
        params[ordinal] = param;
        Reflect.defineMetadata(NODE_PARAMS_KEY, params, target);
    };
}
exports.ASTParam = ASTParam;
function build(entry, nodeTypes) {
    // TODO: Avoid recursion?
    if (nodeTypes === void 0) { nodeTypes = allNodeTypes; }
    if (entry === null) {
        return entry;
    }
    var nodeClass = nodeTypes[entry.type];
    if (!nodeClass) {
        throw new unknownNodeType_1.UnknownNodeType(entry.type);
    }
    var paramNames = Reflect.getMetadata(NODE_PARAMS_KEY, nodeClass);
    var params = [];
    for (var _i = 0, paramNames_1 = paramNames; _i < paramNames_1.length; _i++) {
        var paramName = paramNames_1[_i];
        var param = entry[paramName];
        if (Array.isArray(param)) {
            var statements = param;
            param = [];
            for (var _a = 0, statements_1 = statements; _a < statements_1.length; _a++) {
                var statement = statements_1[_a];
                param.push(build(statement, nodeTypes));
            }
        }
        else if (typeof param === "object") {
            param = build(param, nodeTypes);
        }
        params.push(param);
    }
    return new (nodeClass.bind.apply(nodeClass, __spreadArrays([void 0], params)))();
}
exports.build = build;
