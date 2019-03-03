export class Scope {
  values: { [key: string]: any } = {};

  constructor(protected parent?: Scope) {}

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

  child() {
    return new Scope(this);
  }
}

