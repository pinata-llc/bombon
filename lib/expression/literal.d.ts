import { Scope } from "../scope";
import { Expression } from "./expression";
export declare class Literal<E> extends Expression<E> {
    protected value: E;
    constructor(value: E);
    eval(scope: Scope): E;
}
