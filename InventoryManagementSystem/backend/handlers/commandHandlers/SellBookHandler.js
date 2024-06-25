import Book from "../../models/Book.js";
import BookSoldEvent from "../../events/BookSoldEvent.js";
import EventStore from "../../repositories/EventStore.js";

class SellBookHandler {
  async handle(command) {
    const { bookName, price, quantitySold, bookstoreName } = command;

    const book = await Book.findOne({ name: bookName });
    if (!book) {
      throw new Error("Book not found");
    }

    if (book.quantity < quantitySold) {
      throw new Error("Quantity sold exceeds available quantity");
    }

    book.quantity -= quantitySold;
    await book.save();

    const event = new BookSoldEvent(
      bookName,
      price,
      quantitySold,
      bookstoreName
    );
    await EventStore.save(event);
  }
}

export default SellBookHandler;
