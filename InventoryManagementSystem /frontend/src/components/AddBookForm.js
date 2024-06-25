import { useState } from "react";
import { addBook } from "../services/bookService.js";

const AddBookForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    year: "",
    genre: "",
    publisher: "",
    pages: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBook(formData);
      alert("Book added successfully");
      setFormData({
        title: "",
        author: "",
        genre: "",
        publisher: "",
        pages: "",
        price: "",
        quantity: "",
      });
    } catch (error) {
      alert("Failed to add book");
    }
  };

  return (
    <div className="add-book-form">
       <h2 className="title">Add the received from publisher book</h2>
      <form onSubmit={handleSubmit} className="form">
        {Object.keys(formData).map((key) => (
          <div key={key} className="form-group">
            <label className="form-label">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              type={
                key === "price" ||
                key === "quantity" ||
                key === "pages" ||
                key === "year"
                  ? "number"
                  : "text"
              }
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        ))}
        <button type="submit" className="submit-btn">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
