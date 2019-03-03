export type BreakableScopeType = "function";
export type ScopeType = "program" | "if" | BreakableScopeType;

export class Scope {
  private values: { [key: string]: any } = {};

  constructor(public type: ScopeType = "program", protected parent?: Scope) {}

  hasOwn(name: string) {
    return name in this.values;
  }

  private findScopeWith(name: string) {
    let scope: Scope | undefined = this;

    while (scope && !scope.hasOwn(name)) scope = scope.parent;

    return scope;
  }

  get<T>(name: string): any {
    return (this.findScopeWith(name) || this).values[name];
  }

  set<T>(name: string, value: any) {
    (this.findScopeWith(name) || this).values[name] = value;
  }

  child(type: ScopeType) {
    return new Scope(type, this);
  }

  public broken: boolean = false;
  public returnVal: any;

  break(type: BreakableScopeType, value: any) {
    this.broken = true;

    if (type === this.type) {
      this.returnVal = value;
    } else if (this.parent) {
      this.parent.break(type, value);
    }
  }
}

