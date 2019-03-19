"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var ast_1 = require("./ast");
exports.build = ast_1.build;
__export(require("./scope"));
