import { Expression } from "../expression/expression";
import { Scope } from "../scope";
import { Statement } from "./statement";
export declare class IfStatement extends Statement {
    protected test: Expression<boolean>;
    protected consequent: Statement;
    protected alternate?: Statement | undefined;
    constructor(test: Expression<boolean>, consequent: Statement, alternate?: Statement | undefined);
    eval(scope: Scope): void;
}
