import { useEffect, useState } from 'react';
import { getAllTakenBooks, returnBook } from '../services/books.service';


const AllTakenBooks = () => {
    const [sortedTakenBooks, setSortedTakenBooks] = useState(null);

    useEffect(() => {
        const fetchAndSortTakenBooks = async () => {
            const books = await getAllTakenBooks();
            const sortedBooks = Object.values(books).sort((a, b) => new Date(a.returnedByDate) - new Date(b.returnedByDate));
            setSortedTakenBooks(sortedBooks);
        };

        fetchAndSortTakenBooks();
    }, []);

    const handleReturnBook = async (title, userHandle) => {
        try {
            await returnBook(title, userHandle);
            const books = await getAllTakenBooks();
            const sortedBooks = Object.values(books).sort((a, b) => new Date(a.returnedByDate) - new Date(b.returnedByDate));
            setSortedTakenBooks(sortedBooks);
        } catch (error) {
            console.error('Error returning book:', error);
            throw error;
        }
    };

    return (
        <div>
            <h1>Всички взети книги</h1>
            <ul>
                {sortedTakenBooks &&
                    sortedTakenBooks.map(book => (
                        <li key={book.id}>
                            <h3>{book.title}</h3>
                            <p>Автор: {book.author}</p>
                            <p>Страници: {book.pages}</p>
                            <p>Година на издаване: {book.publishedYear}</p>
                            <p>Взета на: {book.takenOn}</p>
                            <p>Взета от: {book.takenBy}</p>
                            <p>Трябва да бъде върната до : {book.returnedByDate}</p>
                            <button onClick={() => handleReturnBook(book.title, book.takenBy)}>Връщане</button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default AllTakenBooks;