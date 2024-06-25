class BookAddedEvent {
  constructor(name, author, year, genre, publisher, pages, price, quantity) {
    this.type = "BookAddedEvent";
    this.name = name;
    this.author = author;
    this.year = year;
    this.genre = genre;
    this.publisher = publisher;
    this.pages = pages;
    this.price = price;
    this.quantity = quantity;
  }
}

export default BookAddedEvent;
