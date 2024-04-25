import { useState } from 'react';
import { donateBookToLibrary} from '../services/books.service';
import { useNavigate } from 'react-router-dom';


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
                <h1>Дари книга</h1>
                <p>Моля въведете необходимата информация за книгата, която желаете да дарите:</p>
<label> Заглавие на книгата</label>
                <input type="text" name="title" placeholder="Заглавие" value={title} onChange={(e) => setTitle(e.target.value)} />
                <br />
                <label> Автор </label>
                <input type="text" name="author" placeholder="Автор" value={author} onChange={(e) => setAuthor(e.target.value)} />
                <br />
               <label> Страници </label>
                <input type="number" name="pages" placeholder="Страници" value={pages} onChange={(e) => setPages(e.target.value)} />
                <br />
                <label> Година на издаване </label>
                <input type="number" name="publishedYear" placeholder="Година на издаване" value={publishedYear} onChange={(e) => setPublishedYear(e.target.value)} />
                <br />
                
                
    <button type="submit">Дари!</button>


                <p>Благодарим Ви за щедростта! Очакваме да донесете книгата на място в библиотеката през следващите 7 дни. </p>
            </form>
        </div>
    )
    
}

export default DonateBook;