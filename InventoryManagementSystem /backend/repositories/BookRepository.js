import Book from "../models/Book.js";
import BookScrappingEvent from "../events/BookScrappingEvent.js";
import BookAddedEvent from "../events/BookAddedEvent.js";
import EventStore from "../repositories/EventStore.js";

class BookRepository {
  async save(book) {
    let savedBook;
    const existingBook = await Book.findOne({ name: book.name });
    
    if (existingBook) {
      existingBook.quantity += parseInt(book.quantity);
      savedBook = await existingBook.save();
    } else {
      const newBook = new Book(book);
      savedBook = await newBook.save();
    }

    const event = new BookAddedEvent(
      savedBook.name,
      savedBook.author,
      savedBook.year,
      savedBook.genre,
      savedBook.publisher,
      savedBook.pages,
      savedBook.price,
      parseInt(book.quantity)
    );
    await EventStore.save(event);

    return savedBook;
  }

  async findByName(name) {
    const book = await Book.findOne({ name });
    return book;
  }

  async findById(id) {
    return Book.findById(id);
  }

  async getAll() {
    return Book.find({});
  }

  async removeByName(bookName) {
    await Book.deleteMany({ name: bookName });
    const event = new BookScrappingEvent(bookName);
    await EventStore.save(event);
  }

  async scrappingBook(bookName, quantityScrapping) {
    try {
      const book = await this.findByName(bookName);
      if (!book) {
        throw new Error("Book not found");
      }

      if (book.quantity < quantityScrapping) {
        throw new Error("Quantity Scrapping exceeds available quantity");
      }

      book.quantity -= parseInt(quantityScrapping);
      await book.save();

      const event = new BookScrappingEvent(bookName, quantityScrapping);

      return book;
    } catch (error) {
      throw error;
    }
  }
  async sellBook(bookName, price, quantitySold, bookstoreName) {
    try {
      const book = await this.findByName(bookName);

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

      return book;
    } catch (error) {
      throw error;
    }
  }
}

export default BookRepository;
