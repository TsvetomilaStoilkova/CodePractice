import BookRepository from "../../repositories/BookRepository.js";
import BookScrappingEvent from "../../events/BookScrappingEvent.js";
import EventStore from "../../repositories/EventStore.js";

class ScrappingBookHandler {
  async handle(command) {
    const { bookName, quantityScrapping } = command;
    const repository = new BookRepository();

    try {
      await repository.scrappingBook(bookName, quantityScrapping);
      const event = new BookScrappingEvent(bookName, quantityScrapping);
      await EventStore.save(event);
    } catch (error) {
      console.error("Failed to Scrapping book:", error);
      throw error;
    }
  }
}

export default ScrappingBookHandler;
