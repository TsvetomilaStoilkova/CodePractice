import Book from "../../models/Book.js";
import EventStore from "../../repositories/EventStore.js";
import ProductAddedEvent from "../../events/BookAddedEvent.js";

class AddBookHandler {
  async handle(command) {
    const { name, author, year, genre, publisher, pages, price, quantity } =
      command;
    let book = await Book.findOne({
      name,
      author,
      year,
      genre,
      publisher,
      pages,
      price,
    });

    if (book) {
      book.quantity += parseInt(quantity);
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

    if (!command.isRestored) {
      const event = new ProductAddedEvent(
        name,
        author,
        year,
        genre,
        publisher,
        pages,
        price,
        quantity
      );
      await EventStore.save(event);
    }
  }
}

export default AddBookHandler;
