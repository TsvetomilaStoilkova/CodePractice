import Book from "../models/Book.js";

class BookQuery {
  static async getAllBooks() {
    return Book.find({});
  }

  static async getBookById(id) {
    return Book.findById(id);
  }
}

export default BookQuery;
