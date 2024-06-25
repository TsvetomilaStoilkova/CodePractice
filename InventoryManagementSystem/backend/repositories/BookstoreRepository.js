import Bookstore from '../models/Bookstore.js';

class BookstoreRepository {
  async save(bookstoreData) {
    const newBookstore = new Bookstore(bookstoreData);
    return newBookstore.save();
  }

  async findAll() {
    return Bookstore.find({});
  }

  async findById(id) {
    return Bookstore.findById(id);
  }

  async removeById(id) {
    return Bookstore.findByIdAndDelete(id);
  }
}

export default BookstoreRepository;