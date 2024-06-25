import React, { useEffect, useState } from "react";
import { getEvents } from "../services/eventService.js";

const BookHistory = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventsData = await getEvents();

      eventsData.forEach((event) => {
        // Тук може да имам логика за обогатяване на данните, ако е необходимо
      });

      setEvents(eventsData);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setError("Failed to fetch events");
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="book-history-container">
      <h2 className="title">Books's Events</h2>
      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        <table className="events-table">
          <thead>
            <tr>
              <th>Event Type</th>
              <th>Book Name</th>
              <th>Quantity</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index} className={getClassByEventType(event.type)}>
                <td>{event.type}</td>
                <td>{event.payload.name}</td>
                <td>{event.payload.quantity}</td>
                <td>{new Date(event.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
// стилизиране, но го помисли пак...
const getClassByEventType = (eventType) => {
  switch (eventType) {
    case "BookAddedEvent":
      return "added-event";
    case "BookSoldEvent":
      return "sold-event";
    case "BookScrappingEvent":
      return "scrapped-event";
    default:
      return "";
  }
};

export default BookHistory;
