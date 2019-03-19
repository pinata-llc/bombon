"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var unknownNodeType_1 = require("./error/unknownNodeType");
var nodeTypes = {};
function ASTNode(target) {
    nodeTypes[target.name] = target;
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
function build(entry) {
    // TODO: Avoid recursion?
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
                param.push(build(statement));
            }
        }
        else if (typeof param === "object") {
            param = build(param);
        }
        params.push(param);
    }
    return new (nodeClass.bind.apply(nodeClass, [void 0].concat(params)))();
}
exports.build = build;