import mongoose from "mongoose";

const bookstoreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: { type: String },
});

const Bookstore = mongoose.model("Bookstore", bookstoreSchema);

export default Bookstore;
