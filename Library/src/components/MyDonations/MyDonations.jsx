import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {getBooksDonatedByUser} from '../../services/users.service';
import { auth } from "../../config/firebase-config";
import './MyDonations.css';

const MyDonations = () => {
    const [donatedBooks, setDonatedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentUser = auth.currentUser;
    

    useEffect(() => {
        if (currentUser) { 
            getBooksDonatedByUser(currentUser)
                .then((books) => {
                    setDonatedBooks(books);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching donated books:', error);
                    setLoading(false);
                });
        } else {
            setLoading(false); 
        }
    }, [currentUser]);

    return (
        <div>
            <h1>My Donations</h1>
            {loading ? <p>Loading...</p> : (
                <ul>
                    {donatedBooks.length === 0 ? 
                    <>
                    <p>No donations yet</p> 
                    <p> You can make a donation here <Link to="/donateBook">Donate</Link></p>
                    </>
                     :
                    donatedBooks.map((book, index) => (
                        <li key={index}>
                            <h2>{book.title}</h2>
                            <p>Author: {book.author}</p>
                            <p>Pages: {book.pages}</p>
                            <p>Published Year: {book.publishedYear}</p>
                            <p>Donated By: {book.donatedBy}</p>
                            <p>Donated On: {book.donatedOn}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MyDonations;