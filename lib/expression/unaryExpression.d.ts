import { Scope } from "../scope";
import { Expression } from "./expression";
export declare type UnaryOperator = "!" | "-" | "+";
export declare class UnaryExpression extends Expression<any> {
    protected operator: UnaryOperator;
    protected argument: Expression<any>;
    constructor(operator: UnaryOperator, argument: Expression<any>);
    eval(scope: Scope): number | boolean;
}
