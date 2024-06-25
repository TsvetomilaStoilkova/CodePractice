class SellBookCommand {
  constructor(bookName, price, quantitySold, bookstoreName) {
    this.bookName = bookName;
    this.price = price;
    this.quantitySold = quantitySold;
    this.bookstoreName = bookstoreName;
  }
}

export default SellBookCommand;
