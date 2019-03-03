import { BombonError } from "./index";

export class UnknownNodeType extends BombonError {
  constructor(public nodeType: string) {
    super(`Node type: \`${nodeType}\` not implemented`);
  }
}
