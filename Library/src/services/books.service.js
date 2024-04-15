import { get, set, ref, } from 'firebase/database';
import { db } from '../config/firabase-config';
import { getAuth } from 'firebase/auth';
import { getUserByUid } from './users.service';

export const giveBookToUser = async (title, author, pages, publishedYear, takenBy, takenOn, userHandle) => {
    const returnDate = new Date(takenOn);
    returnDate.setDate(returnDate.getDate() + 7);

    try {
        await set(ref(db, `users/${userHandle}/booksToReturn/${title}`), {
            title,
            author,
            pages,
            publishedYear,
            takenOn,
            returnByDate: returnDate.toLocaleDateString(),
        });

        return set(ref(db, `takenBooks/${title}`), {
            title,
            author,
            pages,
            publishedYear,
            takenBy,
            takenOn,
            returnedByDate: returnDate.toLocaleDateString(),
            returnedOnDate: null,
            returned: false,
        });
    } catch (error) {
        console.error('Error giving book to user:', error);
        throw error;
    }
}

export const returnBook = async (title) => {
    try {
        const snapshot = await get(ref(db, `takenBooks/${title}`));
        const book = snapshot.val();

        if (!book) {
            throw new Error(`Book with title ${title} not found in taken books`);
        }

        const userHandle = book.takenBy;
        const userSnapshot = await get(ref(db, `users/${userHandle}`));
        const user = userSnapshot.val();

        if (!user) {
            throw new Error(`User with handle ${userHandle} not found`);
        }

        await set(ref(db, `users/${userHandle}/readedBooks/${title}`), {
            title,
            author: book.author,
            pages: book.pages,
            publishedYear: book.publishedYear,
            takenOn: book.takenOn,
            returnByDate: book.returnedByDate,
            returnedOnDate: new Date().toLocaleDateString(),
        });

        await set(ref(db, `users/${userHandle}/booksToReturn/${title}`), null);
        await set(ref(db, `takenBooks/${title}`), null);

        return true;

    } catch (error) {
        console.error('Error returning book:', error);
        throw error;
    }
}



export const viewAllBooks = async () => {
    try {
        const allBooksSnapshot = await get(ref(db, 'books'));
        const allBooks = allBooksSnapshot.val() || {};
        const takenBooksSnapshot = await get(ref(db, 'takenBooks'));
        const takenBooks = takenBooksSnapshot.val() || {};
        const booksWithAvailability = Object.keys(allBooks).map(title => {
            const taken = takenBooks.hasOwnProperty(title);
            if (taken) {
                return {
                    ...allBooks[title],
                    taken: true,
                    returnByDate: takenBooks[title].returnedByDate
                };
            } else {
                return { ...allBooks[title], taken: false };
            }
        });

        return booksWithAvailability;
    } catch (error) {
        console.log(error.message);
    }
    return null;
}

export const viewBooksByName = (title, uid) => {
    return get(ref(db, `books/${title}`));
}

export const isBookTaken = async (title) => {
    try {
        const snapshot = await get(ref(db, `takenBooks/${title}`));
        return snapshot.exists();
    } catch (error) {
        console.error('Error checking if book is taken:', error);
        throw error;
    }
}

export const viewBooksByAuthor = (author, uid) => {
    return get(ref(db, `books/${author}`));
}

export const deleteBook = (title, uid) => {
    return set(ref(db, `books/${title}`), null);
}

export const donateBookToLibrary = async (title, author, pages, publishedYear, donatedBy, donatedOn) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const userHandle = await getUserByUid(user.uid);

    return set(ref(db, `books/${title}`), {
        title,
        author,
        pages,
        publishedYear,
        donatedBy: userHandle,
        donatedOn: new Date().toLocaleDateString(),
    });
}

