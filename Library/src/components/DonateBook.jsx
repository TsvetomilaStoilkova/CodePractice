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
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold mb-4">Дари книга</h1>
                <p className="text-gray-700 mb-4">Моля, въведете необходимата информация за книгата, която желаете да дарите:</p>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Заглавие на книгата</label>
                    <input type="text" id="title" name="title" placeholder="Заглавие" value={title} onChange={(e) => setTitle(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">Автор</label>
                    <input type="text" id="author" name="author" placeholder="Автор" value={author} onChange={(e) => setAuthor(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pages">Страници</label>
                    <input type="number" id="pages" name="pages" placeholder="Страници" value={pages} onChange={(e) => setPages(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publishedYear">Година на издаване</label>
                    <input type="number" id="publishedYear" name="publishedYear" placeholder="Година на издаване" value={publishedYear} onChange={(e) => setPublishedYear(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Дари!</button>
                </div>
                <p className="text-gray-700 mt-4">Благодарим Ви за щедростта! Очакваме да донесете книгата на място в библиотеката през следващите 7 дни.</p>
            </form>
        </div>
    )
}

export default DonateBook;