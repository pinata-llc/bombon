import { Scope } from "./scope";

export abstract class Node<E = void> {
  abstract eval(scope: Scope): E;
}
