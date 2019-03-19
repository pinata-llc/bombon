import { BombonError } from "./index";
export declare class UnknownUnaryOperator extends BombonError {
    operator: string;
    constructor(operator: string);
}
