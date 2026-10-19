import EventInterface from "../@shared/events/event.interface";

export default class PredictionCalculatedEvent implements EventInterface {
  public dateTimeOccurred: Date;
  public eventData: any;

  public readonly eventName = 'PredictionCalculatedEvent'

  constructor() {
    this.dateTimeOccurred = new Date()
  }
}
