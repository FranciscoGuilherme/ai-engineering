import EventInterface from "./event.interface";

export default interface EventHandlerInterface<T extends EventInterface> {
  handle(event: T): void;
}
