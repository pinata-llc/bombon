export type BreakableScopeType = "function";
export type ScopeType = "program" | "if" | BreakableScopeType;

export class Scope {
  public broken: boolean = false;
  public returnVal: any;
  private values: { [key: string]: any } = {};

  constructor(public type: ScopeType = "program", protected parent?: Scope) {}

  public hasOwn(name: string) {
    return name in this.values;
  }

  public get<T>(name: string): any {
    return (this.findScopeWith(name) || this).values[name];
  }

  public set<T>(name: string, value: any) {
    (this.findScopeWith(name) || this).values[name] = value;
  }

  public child(type: ScopeType) {
    return new Scope(type, this);
  }

  public break(type: BreakableScopeType, value: any) {
    this.broken = true;

    if (type === this.type) {
      this.returnVal = value;
    } else if (this.parent) {
      this.parent.break(type, value);
    }
  }

  private findScopeWith(name: string) {
    let scope: Scope | undefined = this;

    while (scope && !scope.hasOwn(name)) {
      scope = scope.parent;
    }

    return scope;
  }
}
