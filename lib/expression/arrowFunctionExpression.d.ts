import { Scope } from "../scope";
import { BlockStatement } from "../statement/blockStatement";
import { Expression } from "./expression";
import { Identifier } from "./identifier";
export declare class ArrowFunctionExpression extends Expression<(...p: any) => any> {
    protected params: Identifier[];
    protected body: BlockStatement | Expression<any>;
    constructor(params: Identifier[], body: BlockStatement | Expression<any>);
    eval(scope: Scope): any;
}
