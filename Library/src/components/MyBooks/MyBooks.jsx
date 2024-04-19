import { useState, useEffect } from "react";
import { getBooksTakenByUser, getBooksReadedByUser } from "../../services/books.service";
import { auth } from "../../config/firabase-config"


const MyBooks = () => {
  const [booksToReturn, setBooksToReturn] = useState([]);
  const [readedBooks, setReadedBooks] = useState({});
  const [loading, setLoading] = useState(true);
  const currentUser = auth.currentUser;

  useEffect(() => {
    console.log(currentUser)
    if (currentUser) {
      getBooksReadedByUser(currentUser.uid)
        .then((booksObject) => {
          const booksArray = Object.values(booksObject);
          setReadedBooks(booksArray);
          console.log(booksArray);
        })
        .catch(error => {
          console.log('here')
          console.error('Error fetching readed books:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [currentUser]);


  useEffect(() => {
    if (currentUser) {
      getBooksTakenByUser(currentUser)
        .then((books) => {
          setBooksToReturn(books);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching books to return:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }
    , [currentUser]);

   

  return (
    <div>
      <h1>My Books</h1>
      {loading ? <p>Loading...</p> : (
        <div>
          <h2>Books to return</h2>
          {booksToReturn.length === 0 ? <p>No books to return</p> :
<ul>
  {booksToReturn.map((book, index) => (
    <li key={index}>
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Pages: {book.pages}</p>
      <p>Published Year: {book.publishedYear}</p>
      <p>Taken on: {book.takenOn}</p>
      <p>Return by: {book.returnedByDate}</p>
    </li>
  ))}
</ul>}
          <h2>Readed Books</h2>
          {readedBooks.length === 0 ? <p>No readed books</p> :
            <ul>
              {readedBooks.map((book, index) => (
                <li key={index}>
                  <h3>{book.title}</h3>
                  <p>Author: {book.author}</p>
                  <p>Pages: {book.pages}</p>
                  <p>Published Year: {book.publishedYear}</p>
                  <p>Taken on: {book.takenOn}</p>
                  <p>Returned on: {book.returnedOnDate}</p>
                </li>
              ))}
            </ul>
          }
        </div>
      )}
    </div>
  );
}

export default MyBooks;