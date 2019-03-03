import { ASTNode } from "./ast";
import { BlockStatement } from "./statement/blockStatement";

@ASTNode
export class Program extends BlockStatement {}
