import Book from "../../models/Book.js";
import EventStore from "../../repositories/EventStore.js";
import AddBookCommand from "../../commands/AddBookCommand.js";

class AddBookHandler {
  async handle(command) {
    const { name, author, year, genre, publisher, pages, price, quantity } =
      command;

    try {
      let book = await Book.findOne({ name });

      if (book) {
        book.quantity += quantity;
      } else {
        book = new Book({
          name,
          author,
          year,
          genre,
          publisher,
          pages,
          price,
          quantity,
        });
      }

      await book.save();

      const eventPayload = {
        name,
        author,
        year,
        genre,
        publisher,
        pages,
        price,
        quantity,
      };
      await EventStore.save("BookAddedEvent", eventPayload);

      return book;
    } catch (error) {
      throw new Error(`Failed to add book: ${error.message}`);
    }
  }
}

export default AddBookHandler;
