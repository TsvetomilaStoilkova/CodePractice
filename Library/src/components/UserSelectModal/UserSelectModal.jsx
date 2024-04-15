import { useState } from 'react';
import Modal from 'react-modal';
import { giveBookToUser } from '../../services/books.service';
import './UserSelectModal.css';

const UserSelectModal = ({ isOpen, onRequestClose, users, selectedBook }) => {
    const [selectedUsers, setSelectedUsers] = useState({});
    const [search, setSearch] = useState('');

    const handleSelectUser = (user) => {
        setSelectedUsers((prevSelectedUsers) => {
            if (prevSelectedUsers[user.uid]) {
                const newSelectedUsers = { ...prevSelectedUsers };
                delete newSelectedUsers[user.uid];
                return newSelectedUsers;
            }
            return { ...prevSelectedUsers, [user.uid]: user };
        });
    }
// 
const handleGiveBook = async (title, author, pages, publishedYear) => {
    try {
        const selectedUsersArray = Object.values(selectedUsers);
        if (selectedUsersArray.length === 0) {
            alert('Please select at least one user');
            return;
        }

        const currentDate = new Date().toLocaleString();
        const returnDate = new Date(currentDate);
        returnDate.setDate(returnDate.getDate() + 7);

        for (const user of selectedUsersArray) {
            await giveBookToUser(
                title,
                author,
                pages,
                publishedYear,
                user.uid,
                currentDate,
                returnDate
            );
        }

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
            <h1>Select User</h1>
            <input type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
            <ul>
                {Object.keys(users).map((userKey, index) => {
                    const user = users[userKey];
                    if (user.handle.toLowerCase().includes(search.toLowerCase())) {
                        return (
                            <li key={index} >
                            
                                {user.handle}
                                <input type="checkbox" onChange={() => handleSelectUser(user)} />
                            </li>
                        );
                    }
                    return null;
                })}
            </ul>
            <button onClick={onRequestClose}>Cancel</button>
            <button onClick={() => handleGiveBook(selectedBook.title, selectedBook.author, selectedBook.pages, selectedBook.publishedYear)}>Give Book</button>
        </Modal>
    );
}

export default UserSelectModal;