import "reflect-metadata";
declare type NodeClass = any;
export declare function ASTNode(target: NodeClass): void;
export declare function ASTParam(param: string): (target: any, prop: string, ordinal: number) => void;
export declare function build(entry: any): any;
export {};
