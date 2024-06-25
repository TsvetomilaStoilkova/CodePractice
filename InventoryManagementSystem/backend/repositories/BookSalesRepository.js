import BookSale from "../models/BookSale.js";

class BookSaleRepository {
  async save(saleData) {
    const bookSale = new BookSale(saleData);
    return bookSale.save();
  }

  async findAll() {
    return BookSale.find({});
  }

  async findByBook(bookName) {
    return BookSale.find({ bookName });
  }
}

export default BookSaleRepository;