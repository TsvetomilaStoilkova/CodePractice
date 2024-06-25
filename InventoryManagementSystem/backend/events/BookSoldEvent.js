class BookSoldEvent {
  constructor(name, price, quantity, bookstoreName) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.bookstoreName = bookstoreName;
  }
}

export default BookSoldEvent;
