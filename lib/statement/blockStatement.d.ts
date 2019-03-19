import { Scope } from "../scope";
import { Statement } from "./statement";
export declare class BlockStatement extends Statement {
    protected body: Statement[];
    constructor(body: Statement[]);
    eval(scope: Scope): void;
}
