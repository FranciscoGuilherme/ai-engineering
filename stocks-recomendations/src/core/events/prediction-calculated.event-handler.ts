import EventHandlerInterface from "../@shared/events/event-handler.interface";
import PredictionCalculatedEvent from "./prediction-calculated.event";

export default class PredictionCalculatedEventHandler implements EventHandlerInterface<PredictionCalculatedEvent> {
  public handle(event: PredictionCalculatedEvent): void {
    console.log(
      `Preciction calculated at ${event.dateTimeOccurred} with data: ${event.eventData}`,
    );
  }
}
