import mongoose from "mongoose";

const bookSaleSchema = new mongoose.Schema({
  bookstore: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bookstore",
    required: true,
  },
  bookstoreName: { type: String, required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  quantitySold: { type: Number, required: true },
  saleDate: { type: Date, default: Date.now },
});

const BookSale = mongoose.model("BookSale", bookSaleSchema);

export default BookSale;
