import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export interface EventDispatcherInterface<T extends EventInterface> {
  notify(event: T): void;
  register(eventName: string, eventHandler: EventHandlerInterface<T>): void;
  unregister(eventName: string, eventHandler: EventHandlerInterface<T>): void;
  unregisterAll(): void;
}
