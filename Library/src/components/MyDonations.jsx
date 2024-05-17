import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {getBooksDonatedByUser} from '../services/users.service';
import { auth } from "../config/firebase-config";


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
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Моите дарения</h1>
            {loading ? <p>Loading...</p> : (
                <ul>
                    {donatedBooks.length === 0 ? 
                        <>
                            <p>Все още нямате дарени книги</p> 
                            <p>Можете да направите дарение <Link to="/donateBook">тук</Link></p>
                        </>
                        :
                        donatedBooks.map((book, index) => (
                            <li key={index} className="mb-8 p-4 bg-gray-100 rounded-lg">
                                <h2 className="text-xl font-bold mb-2">{book.title}</h2>
                                <p>Автор: {book.author}</p>
                                <p>Страници: {book.pages}</p>
                                <p>Година на издаване: {book.publishedYear}</p>
                                <p>Дарена от: {book.donatedBy}</p>
                                <p>Дарена на: {book.donatedOn}</p>
                            </li>
                        ))
                    }
                </ul>
            )}
        </div>
    );
}

export default MyDonations;