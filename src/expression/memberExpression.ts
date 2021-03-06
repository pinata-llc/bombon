import { ASTNode, ASTParam } from "../ast";
import { Scope } from "../scope";
import { Expression } from "./expression";
import { Identifier } from "./identifier";

@ASTNode
export class MemberExpression extends Expression<any> {
  constructor(
    @ASTParam("object")
    protected object: Expression<object>,
    @ASTParam("property")
    protected property: Identifier | Expression<string>,
  ) {
    super();
  }

  public eval(scope: Scope): any {
    const obj: any = this.object.eval(scope);
    const name = this.property instanceof Identifier ? this.property.name : this.property.eval(scope);
    let value = obj[name];

    if (typeof value === "function") {
      value = value.bind(obj);
    }

    return value;
  }
}
