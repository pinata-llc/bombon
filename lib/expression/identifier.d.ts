import { Scope } from "../scope";
import { Expression } from "./expression";
export declare class Identifier<E = any> extends Expression<E> {
    name: string;
    constructor(name: string);
    eval(scope: Scope): any;
}
