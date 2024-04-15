import { useEffect, useState } from "react";
import { viewAllBooks, returnBook } from "../../services/books.service";
import UserSelectModal from "../UserSelectModal/UserSelectModal";
import { auth } from "../../config/firabase-config";
import { getAllUsers } from '../../services/users.service';


const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedBook, setSelectedBook] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    

    useEffect(() => {
        const fetchBooks = async () => {
            const allBooks = await viewAllBooks();
            setBooks(allBooks);
        }
        fetchBooks();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            const allUsers = await getAllUsers();
            setUsers(allUsers);
        }
        fetchUsers();
        setIsAdmin(auth.currentUser && auth.currentUser.email === 'admin@gmail.com');
    }, []);

    const openModal = (book) => {
        setSelectedBook(book);
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const handleReturnBook = async (title, userHandle) => {
        try {
            await returnBook(title, userHandle); 
            const allBooks = await viewAllBooks();
            setBooks(allBooks);
        } catch (error) {
            console.error('Error returning book:', error);
            throw error;
        }
    }
  

    const filteredBooks = books ? Object.values(books).filter(book =>
        book.title && book.author && (book.title.toLowerCase().includes(search.toLowerCase()) ||  book.author.toLowerCase().includes(search.toLowerCase()))
    ) : [];


    
    return (
        <div>
            <h1>All Books</h1>
            <p>Here are all the books in our library.</p>
            <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
            <br />
            {filteredBooks.length === 0 ? (
                <p>No books found.</p>
            ) : (
                <ul>
                
                {filteredBooks.map((book, index) => (
                 
                    <li key={index}>
                        <h2>{book.title}</h2>
                        <p>Author: {book.author}</p>
                        <p>Pages: {book.pages}</p>
                        <p>Published Year: {book.publishedYear}</p>
                        <p>Donated By: {book.donatedBy}</p>
                        <p>Donated On: {book.donatedOn}</p>
                        {isAdmin && book.taken && (
    <>
        <p>Taken by: {book.takenBy}</p>
        <p>Return by: {book.returnByDate}</p>
        <button onClick={() => handleReturnBook(book.title)}>The reader give it back</button>
    </>
)}
                        {!isAdmin && book.taken && (
                        
                            <p>The book is already taken and should be returned by {book.returnByDate}</p>
                        )}
                        {isAdmin && !book.taken && (
                            <button onClick={() => openModal(book)}>Give book to a reader</button>
                        )}
                    </li>
                ))}
                </ul>
            )}
            <UserSelectModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                users={users}
                selectedBook={selectedBook}
            />
        </div>
    );
}

export default AllBooks;
