import { BombonError } from "./index";
export declare class UnknownBinaryOperator extends BombonError {
    operator: string;
    constructor(operator: string);
}
