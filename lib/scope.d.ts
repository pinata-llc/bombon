export declare type BreakableScopeType = "function";
export declare type ScopeType = "program" | "if" | BreakableScopeType;
export declare class Scope {
    type: ScopeType;
    protected parent?: Scope | undefined;
    broken: boolean;
    returnVal: any;
    private values;
    constructor(type?: ScopeType, parent?: Scope | undefined);
    hasOwn(name: string): boolean;
    get<T>(name: string): any;
    set<T>(name: string, value: any): void;
    child(type: ScopeType): Scope;
    break(type: BreakableScopeType, value: any): void;
    private findScopeWith;
}
