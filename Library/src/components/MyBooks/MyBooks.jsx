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
      <h1>Моите книги</h1>
      {loading ? <p>Loading...</p> : (
        <div>
          <h2>Какво чета в момента?</h2>
          {booksToReturn.length === 0 ? <p> В момента не чета нищо от библиотеката. Няма книги, които да трябва да бъдат върнати.</p> :
<ul>
  {booksToReturn.map((book, index) => (
    <li key={index}>
      <h3>{book.title}</h3>
      <p>Автор: {book.author}</p>
      <p>Страници: {book.pages}</p>
      <p>Година на издаване: {book.publishedYear}</p>
      <p>Взета от: {book.takenOn}</p>
      <p>Трябва да бъде върната до: {book.returnedByDate}</p>
    </li>
  ))}
</ul>}
          <h2>Прочетени книги</h2>
          {readedBooks.length === 0 ? <p>Все още не съм чел нищо от тук. </p> :
            <ul>
              {readedBooks.map((book, index) => (
                <li key={index}>
                  <h3>{book.title}</h3>
                  <p>Автор: {book.author}</p>
                  <p>Страници: {book.pages}</p>
                  <p>Година на издаване: {book.publishedYear}</p>
                  <p>Върната на: {book.returnedOnDate}</p>
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