import { Scope } from "../scope";
import { Expression } from "./expression";
export declare type BinaryOperator = "==" | "!=" | "===" | "!==" | "<" | "<=" | ">" | ">=" | "+" | "-" | "*" | "/" | "%";
export declare type BinaryOpValue = any;
export declare class BinaryExpression extends Expression<BinaryOpValue> {
    protected left: Expression<BinaryOpValue>;
    protected operator: BinaryOperator;
    protected right: Expression<BinaryOpValue>;
    constructor(left: Expression<BinaryOpValue>, operator: BinaryOperator, right: Expression<BinaryOpValue>);
    eval(scope: Scope): any;
}
