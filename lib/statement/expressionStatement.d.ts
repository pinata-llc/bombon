import { Expression } from "../expression/expression";
import { Scope } from "../scope";
import { Statement } from "./statement";
export declare class ExpressionStatement extends Statement {
    protected expression: Expression<any>;
    constructor(expression: Expression<any>);
    eval(scope: Scope): void;
}
