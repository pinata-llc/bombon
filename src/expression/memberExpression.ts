import {Expression} from "./expression";
import {ASTNode, ASTParam} from "../ast";
import {Identifier} from "./identifier";

@ASTNode
export class MemberExpression extends Expression<any> {

  constructor (
    @ASTParam("object")
    protected object: Expression<Object>,

    @ASTParam("property")
    protected property: Identifier | Expression<string>
  ) {
    super();
  }

  eval(): any {
    const obj: any = this.object.eval();
    const name = this.property instanceof Identifier ? this.property.name : this.property.eval();
    return obj[name];
  }
}
