import { Scope } from "./scope";
export declare abstract class Node<E = void> {
    abstract eval(scope: Scope): E;
}
