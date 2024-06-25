import Event from "../models/Event.js";
import EventStore from "../repositories/EventStore.js";

class EventsController {
  static async addEvent(req, res) {
    const { name, date, location, price, tickets } = req.body;
    const event = new Event({ name, date, location, price, tickets });

    try {
      await EventStore.save(event); 
      res.status(201).json({ message: "Event added successfully" });
    } catch (error) {
      console.error("Failed to add event:", error);
      res.status(500).json({ message: "Failed to add event", error });
    }
  }

  static async getEvents(req, res) {
    try {
      const events = await EventStore.getAllEvents(); 
      res.status(200).json(events);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      res.status(500).json({ message: "Failed to fetch events", error });
    }
  }
}

export default EventsController;
