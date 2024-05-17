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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4 text-center">Всички книги</h1>
            <div className="flex justify-center mb-4">
                <input type="text" placeholder="Търсене" value={search} onChange={(e) => setSearch(e.target.value)} className="border border-gray-300 px-4 py-2 rounded-md w-64" />
            </div>
            {filteredBooks.length === 0 ? (
                <p className="text-center">Няма намерени книги.</p>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBooks.map((book, index) => (
                        <li key={index} className="border border-gray-300 p-4 rounded-md">
                            <h2 className="text-lg font-semibold">{book.title}</h2>
                            <p className="text-gray-600">Автор: {book.author}</p>
                            <p className="text-gray-600">Страници: {book.pages}</p>
                            <p className="text-gray-600">Година на издаване: {book.publishedYear}</p>
                            {book.donatedBy !== 'Admin' && (
                                <p className="text-gray-600">Дарена от: {book.donatedBy}</p>
                            )}
                            {isAdmin && book.taken && (
                                <p className="text-red-500">Трябва да бъде върната до: {book.returnByDate}</p>
                            )}
                            {!isAdmin && book.taken && (
                                <p className="text-red-500">Книгата е взета от друг читател, трябва да бъде върната най-късно на {book.returnByDate}</p>
                            )}
                            {isAdmin && !book.taken && (
                                <button onClick={() => openModal(book)} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600">Даване на читател</button>
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
