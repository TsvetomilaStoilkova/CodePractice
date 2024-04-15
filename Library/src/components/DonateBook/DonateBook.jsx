import { useState } from 'react';
import { donateBookToLibrary} from '../../services/books.service';
import { useNavigate } from 'react-router-dom';
import './DonateBook.css';

const DonateBook = () => { 

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [pages, setPages] = useState('');
    const [publishedYear, setPublishedYear] = useState('');
    const navigate = useNavigate();
 


    const handleDonate = async (title, author, pages, publishedYear) => {
        try {
            await donateBookToLibrary(title, author, pages, publishedYear);
            return 'Book donated successfully!';
        } catch (error) {
            console.error('Error donating book:', error);
            throw error; 
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await handleDonate(title, author, pages, publishedYear);
            navigate('/allBooks');


        } catch (error) {
            console.error('Error donating book:', error);
        }
    }


    return (
        <div>
            <form className="donateBook-Form" onSubmit={handleSubmit}>
                <h1>Donate Book</h1>
                <p>Fill in the details of the book you would like to donate.</p>
<label> Title</label>
                <input type="text" name="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <br />
                <label> Author</label>
                <input type="text" name="author" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                <br />
               <label> Pages</label>
                <input type="number" name="pages" placeholder="Pages" value={pages} onChange={(e) => setPages(e.target.value)} />
                <br />
                <label> Published Year</label>
                <input type="number" name="publishedYear" placeholder="Published Year" value={publishedYear} onChange={(e) => setPublishedYear(e.target.value)} />
                <br />
                
                
    <button type="submit">Donate Book</button>


                <p>Thank you for you generosity, we will waiting for you to bring the book in the library within 7 days!</p>
            </form>
        </div>
    )
    
}

export default DonateBook;