import EventModel from "../models/Event.js";

class EventStore {
  static async save(event) {
    const eventModel = new EventModel({
      type: event.constructor.name,
      payload: event,
    });
    await eventModel.save();
  }

  static async getAllEvents() {
    return EventModel.find({});
  }
}

export default EventStore;
