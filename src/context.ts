export class Context {
  values: { [key: string]: any } = {};

  constructor(protected parent?: Context) {
  }

  hasOwn(name: string) {
    return name in this.values;
  }

  findContextWith(name: string) {
    let ctx: Context | undefined = this;

    while (ctx && !ctx.hasOwn(name)) ctx = ctx.parent;

    return ctx;
  }

  get<T>(name: string): any {
    return (this.findContextWith(name) || this).values[name];
  }

  set<T>(name: string, value: any) {
    (this.findContextWith(name) || this).values[name] = value;
  }

  child() {
    return new Context(this);
  }
}

