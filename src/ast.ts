import "reflect-metadata";
import {BombonError} from "./error";
import {Context} from "./context";

type NodeClass = any;

const nodeTypes: {
  [type: string]: NodeClass
} = {};

export function ASTNode(target: NodeClass) {
  nodeTypes[target.name] = target;
}

const NODE_PARAMS_KEY = "bombon:AST:node:params";

export function ASTParam(param: string) {
  return (target: any, prop: string, ordinal: number) => {
    const params = Reflect.getMetadata(NODE_PARAMS_KEY, target) || [];
    params[ordinal] = param;
    Reflect.defineMetadata(NODE_PARAMS_KEY, params, target)
  };
}

export function build(entry: any, ctx: Context) {
  // TODO: Avoid recursion?

  if (entry === null) return entry;

  const nodeClass = nodeTypes[entry.type];

  if (!nodeClass) {
    throw new UnknownNodeType(entry.type);
  }

  const paramNames = Reflect.getMetadata(NODE_PARAMS_KEY, nodeClass);

  const params = [];

  for (const paramName of paramNames) {
    let param = entry[paramName];

    if (Array.isArray(param)) {
      const statements = param;
      param = [];

      for (const statement of statements) {
        param.push(build(statement, ctx));
      }
    } else if (typeof param === "object") {
      param = build(param, ctx);
    }

    params.push(param);
  }

  return new nodeClass(...params, ctx);
}

export class UnknownNodeType extends BombonError {
  constructor(public nodeType: string) {
    super(`Node type: \`${nodeType}\` not implemented`);
  }
}
