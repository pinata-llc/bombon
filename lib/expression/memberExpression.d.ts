import { Scope } from "../scope";
import { Expression } from "./expression";
import { Identifier } from "./identifier";
export declare class MemberExpression extends Expression<any> {
    protected object: Expression<object>;
    protected property: Identifier | Expression<string>;
    constructor(object: Expression<object>, property: Identifier | Expression<string>);
    eval(scope: Scope): any;
}
