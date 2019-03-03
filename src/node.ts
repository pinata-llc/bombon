import { Scope } from "./scope";

export abstract class Node<E = void> {
  public abstract eval(scope: Scope): E;
}
