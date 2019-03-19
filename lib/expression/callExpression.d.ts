import { Scope } from "../scope";
import { Expression } from "./expression";
export declare class CallExpression extends Expression<any> {
    protected callee: Expression<(...p: any) => any>;
    protected args: Array<Expression<any>>;
    constructor(callee: Expression<(...p: any) => any>, args: Array<Expression<any>>);
    eval(scope: Scope): any;
}
