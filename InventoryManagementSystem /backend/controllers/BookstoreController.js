import BookstoreRepository from '../repositories/BookstoreRepository.js';

class BookstoreController {
  static async addBookstore(req, res) {
    const { name, email, phone, address } = req.body;
    const repository = new BookstoreRepository();

    try {
      const bookstore = await repository.save({ name, email, phone, address });
      res.status(201).json({ message: "Bookstore added successfully", bookstore });
    } catch (error) {
      console.error("Failed to add Bookstore:", error);
      res.status(500).json({ message: "Failed to add Bookstore", error });
    }
  }

  static async getBookstores(req, res) {
    const repository = new BookstoreRepository();

    try {
      const bookstores = await repository.findAll();
      res.status(200).json(bookstores);
    } catch (error) {
      console.error("Failed to fetch Bookstores:", error);
      res.status(500).json({ message: "Failed to fetch Bookstores", error });
    }
  }

}

export default BookstoreController;