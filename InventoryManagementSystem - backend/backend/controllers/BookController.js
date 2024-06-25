import BookQuery from "../queries/BookQuery.js";
import BookRepository from "../repositories/BookRepository.js";
import AddBookCommand from "../commands/AddBookCommand.js";
import AddBookHandler from "../handlers/commandHandlers/AddBookHandler.js";
import ScrappingBookCommand from "../commands/ScrappingBookCommand.js";
import ScrappingBookHandler from "../handlers/commandHandlers/ScrappingBookHandler.js";
import SellBookCommand from "../commands/SellBookCommand.js";
import SellBookHandler from "../handlers/commandHandlers/SellBookHandler.js";

class BookController {
  static async addBook(req, res) {
    const { name, author, year, genre, publisher, pages, price, quantity } =
      req.body;
    const addBookCommand = new AddBookCommand(
      name,
      author,
      year,
      genre,
      publisher,
      pages,
      price,
      quantity
    );
    const addBookHandler = new AddBookHandler();

    try {
      const newBook = await addBookHandler.handle(addBookCommand);
      res.status(201).json(newBook);
    } catch (error) {
      console.error("Failed to add book:", error);
      res
        .status(500)
        .json({ message: "Failed to add book", error: error.message });
    }
  }

  static async scrappingBook(req, res) {
    const { name } = req.params;
    const { quantityScrapping } = req.body;
    const scrappingBookCommand = new ScrappingBookCommand(
      name,
      quantityScrapping
    );
    const scrappingBookHandler = new ScrappingBookHandler();

    try {
      await scrappingBookHandler.handle(scrappingBookCommand);
      res.status(200).json({ message: "Book Scrapping successfully" });
    } catch (error) {
      console.error("Failed to Scrapping book:", error);
      res
        .status(500)
        .json({ message: "Failed to Scrapping book", error: error.message });
    }
  }

  static async sellBook(req, res) {
    const { bookName } = req.params;
    const { price, quantitySold, bookstoreName } = req.body;

    try {
      const sellBookCommand = new SellBookCommand(
        bookName,
        price,
        quantitySold,
        bookstoreName
      );
      const sellBookHandler = new SellBookHandler();
      await sellBookHandler.handle(sellBookCommand);

      res.status(200).json({ message: "Book sold successfully" });
    } catch (error) {
      console.error("Failed to sell book:", error);
      res
        .status(500)
        .json({ message: "Failed to sell book", error: error.message });
    }
  }

  static async getAllBooks(req, res) {
    try {
      const books = await BookQuery.getAllBooks();
      res.status(200).json(books);
    } catch (error) {
      console.error("Failed to fetch books:", error);
      res
        .status(500)
        .json({ message: "Failed to fetch books", error: error.message });
    }
  }

  static async getBookById(req, res) {
    const { id } = req.params;
    try {
      const book = await BookQuery.getBookById(id);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.status(200).json(book);
    } catch (error) {
      console.error(`Failed to fetch book with id ${id}:`, error);
      res.status(500).json({
        message: `Failed to fetch book with id ${id}`,
        error: error.message,
      });
    }
  }
}

export default BookController;
