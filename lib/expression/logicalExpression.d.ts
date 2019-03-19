import { Scope } from "../scope";
import { Expression } from "./expression";
export declare type LogicalOperator = "||" | "&&";
export declare class LogicalExpression extends Expression<boolean> {
    protected left: Expression<boolean>;
    protected operator: LogicalOperator;
    protected right: Expression<boolean>;
    constructor(left: Expression<boolean>, operator: LogicalOperator, right: Expression<boolean>);
    eval(scope: Scope): boolean;
}
