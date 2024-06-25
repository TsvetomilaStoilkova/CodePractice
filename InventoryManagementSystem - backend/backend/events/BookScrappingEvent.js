class BookScrappingEvent {
  constructor(name, quantity) {
    this.type = "BookScrappingEvent";
    this.name = name;
    this.quantity = quantity;
  }
}

export default BookScrappingEvent;
