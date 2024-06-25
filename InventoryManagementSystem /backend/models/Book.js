import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: String, required: true },
  genre: { type: String, required: true },
  publisher: { type: String, required: true },
  pages: { type: Number, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 }, 
});

const Book = mongoose.model("Book", BookSchema);

export default Book;
