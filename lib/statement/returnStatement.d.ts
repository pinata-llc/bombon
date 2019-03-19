import { Expression } from "../expression/expression";
import { Scope } from "../scope";
import { Statement } from "./statement";
export declare class ReturnStatement extends Statement {
    protected argument: Expression<any> | null;
    constructor(argument: Expression<any> | null);
    eval(scope: Scope): void;
}
