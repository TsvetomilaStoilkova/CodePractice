import React, { useEffect, useState } from "react";
import { getBooks, scrappingBook, sellBook } from "../services/bookService.js";
import { getBookstores } from "../services/bookstoreService.js";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedBookstore, setSelectedBookstore] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [bookstores, setBookstores] = useState([]);

  useEffect(() => {
    fetchBooks();
    fetchBookstores();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  const fetchBookstores = async () => {
    try {
      const data = await getBookstores();
      setBookstores(data);
    } catch (error) {
      console.error("Failed to fetch bookstores:", error);
    }
  };

  const handleAction = async (book, actionType) => {
    try {
      switch (actionType) {
        case "scrapping":
          await scrappingBook(book.name, quantity);
          alert(`Successfully scrapped ${quantity} copies of ${book.name}`);
          break;
        case "selling":
          if (!selectedBookstore) {
            alert("Please select a bookstore");
            return;
          }
          const sellData = {
            bookName: book.name,
            price: book.price,
            quantitySold: quantity,
            bookstoreName: selectedBookstore,
          };
          await sellBook(sellData);
          alert(
            `Successfully sold ${quantity} copies of ${book.name}.`
          );
          break;
        default:
          break;
      }
      fetchBooks();
      setQuantity(1);
      setSelectedBookstore("");

      setBooks((prevBooks) =>
        prevBooks.map((prevBook) =>
          prevBook._id === book._id ? { ...prevBook, actionType: "" } : prevBook
        )
      );
    } catch (error) {
      console.error(
        `Failed to ${actionType === "scrapping" ? "scrap" : "sell"} book:`,
        error
      );
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="book-list-container">
     <h2 className="title">Books's Main Information - Quantities and Actions</h2>
      <input
        type="text"
        placeholder="Search by book name"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <table className="book-table">
        <thead>
          <tr className="table-header">
            <th className="table-cell">Book Name</th>
            <th className="table-cell">Author</th>
            <th className="table-cell">Publisher</th>
            <th className="table-cell">Quantity</th>
            <th className="table-cell">Action Type</th>
            <th className="table-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book._id} className="table-row">
              <td className="table-cell">{book.name}</td>
              <td className="table-cell">{book.author}</td>
              <td className="table-cell">{book.publisher}</td>
              <td className="table-cell">{book.quantity}</td>
              <td className="table-cell">
                <select
                  value={book.actionType || ""}
                  onChange={(e) => {
                    const newActionType = e.target.value;
                    setBooks((prevBooks) =>
                      prevBooks.map((prevBook) =>
                        prevBook._id === book._id
                          ? { ...prevBook, actionType: newActionType }
                          : prevBook
                      )
                    );
                  }}
                >
                  <option value="">Select action</option>
                  <option value="scrapping">Scrapping</option>
                  <option value="selling">Selling</option>
                </select>
              </td>
              <td className="table-cell">
                {book.actionType === "scrapping" && (
                  <>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="1"
                    />
                    <button
                      className="action-btn"
                      onClick={() => handleAction(book, "scrapping")}
                    >
                      Scrap
                    </button>
                  </>
                )}
                {book.actionType === "selling" && (
                  <>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="1"
                    />
                    <select
                      value={selectedBookstore}
                      onChange={(e) => setSelectedBookstore(e.target.value)}
                    >
                      <option value="">Select a bookstore</option>
                      {bookstores.map((bookstore) => (
                        <option key={bookstore._id} value={bookstore._id}>
                          {bookstore.name}
                        </option>
                      ))}
                    </select>
                    <button
                      className="action-btn"
                      onClick={() => handleAction(book, "selling")}
                    >
                      Sell
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
