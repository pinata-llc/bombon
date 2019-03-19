import { BombonError } from "./index";
export declare class UnknownNodeType extends BombonError {
    nodeType: string;
    constructor(nodeType: string);
}
