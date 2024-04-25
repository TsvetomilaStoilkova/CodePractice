import { useEffect, useState } from "react";
import { viewAllBooks} from "../services/books.service";
import UserSelectModal from "../components/UserSelectModal";
import { auth } from "../config/firebase-config";
import { getAllUsers } from '../services/users.service';


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


    const filteredBooks = books ? Object.values(books).filter(book =>
        book.title && book.author && (book.title.toLowerCase().includes(search.toLowerCase()) || book.author.toLowerCase().includes(search.toLowerCase()))
    ) : [];



    return (
        <div class="text-green-500">
            <h1>Всички книги</h1>
            <p>Списък с всички заглавия</p>
            <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
            <br />
            {filteredBooks.length === 0 ? (
                <p>Няма намерени.  </p>
            ) : (
                <ul>

                    {filteredBooks.map((book, index) => (

                        <li key={index}>
                            <h2>{book.title}</h2>
                            <p>Автор: {book.author}</p>
                            <p>Страници: {book.pages}</p>
                            <p>Година на издаване: {book.publishedYear}</p>
                            {book.donatedBy !== 'Admin' && (<p>Дарена от: {book.donatedBy}</p>)}
                            {isAdmin && book.taken && (
                                <>
                                    <p>Трябва да бъде върната до : {book.returnByDate}</p>
                                </>
                            )}
                            {!isAdmin && book.taken && (

                                <p>Книгата е взета от друг читател, трябва да бъде върната най-късно на {book.returnByDate}</p>
                            )}
                            {isAdmin && !book.taken && (
                                <button onClick={() => openModal(book)}>Даване на читател</button>
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
