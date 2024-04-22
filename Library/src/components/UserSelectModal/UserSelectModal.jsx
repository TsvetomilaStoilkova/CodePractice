import { useState } from 'react';
import Modal from 'react-modal';
import { giveBookToUser } from '../../services/books.service';
import './UserSelectModal.css';

const UserSelectModal = ({ isOpen, onRequestClose, users, selectedBook }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [search, setSearch] = useState('');

    const handleSelectUser = (user) => {
        setSelectedUser(user);
    }

    const handleGiveBook = async (title, author, pages, publishedYear) => {
        try {
            if (!selectedUser) {
                alert('Please select a user');
                return;
            }
    
            const currentDate = new Date().toISOString();
            const returnDate = new Date(currentDate);
            returnDate.setDate(returnDate.getDate() + 7);
    
            await giveBookToUser(
                title,
                author,
                pages,
                publishedYear,
                selectedUser.handle, 
                currentDate,
                selectedUser.handle 
            );
    
            onRequestClose();
        } catch (error) {
            console.error('Error giving book to user:', error);
            throw error;
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="userSelect-Modal"
        >
            <h1>Читатели</h1>
            <input type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
            <ul>
            {Object.keys(users).map((userKey, index) => {
                const user = users[userKey];
                if (user && user.handle && user.handle.toLowerCase().includes(search.toLowerCase())) {
                    return (
                        <li key={index}>
                            {user.handle}
                            <input
                                type="radio"
                                name="user"
                                value={user.handle}
                                checked={selectedUser && selectedUser.handle === user.handle}
                                onChange={() => handleSelectUser(user)}
                            />
                        </li>
                    );
                }
                return null;
            })}
            </ul>
            <button onClick={onRequestClose}>Затвори</button>
            <button onClick={() => handleGiveBook(selectedBook.title, selectedBook.author, selectedBook.pages, selectedBook.publishedYear)}>Даване на чител</button>
        </Modal>
    );
}

export default UserSelectModal;