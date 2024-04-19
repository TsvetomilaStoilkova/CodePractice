import { get, set, ref, query, equalTo, orderByChild } from 'firebase/database';
import { db } from '../config/firabase-config';
import { viewAllBooks } from './books.service';

export const getUserByHandle = (handle) => {
    return get(ref(db, `users/${handle}`));
};

export const getUserByUid = async (uid) => {
    const snapshot = await get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
    if (snapshot.exists()) {
        const userData = snapshot.val();
        const userHandle = Object.values(userData)[0].handle;
        return userHandle;
    } else {
        return null;
    }
}

export const updateUserByHandle = (handle, prop, value) => {
    return set(ref(db, `users/${handle}/${prop}`), value);
};

export const createUserHandle = (firstName, lastName, handle, uid, email) => {
    const userHandleRef = ref(db, `users/${handle}`);
    return get(userHandleRef).then((snapshot) => {
        if (snapshot.exists()) {
            throw new Error('User handle already exists');
        } else {
            const userObject = {
                firstName,
                lastName,
                handle,
                uid,
                email,
                createdOn: new Date(),
                booksToReturn: {},
                readedBooks: {}

            };
            return set(userHandleRef, userObject);
        }
    }).catch((error) => {
        console.error('Error creating user handle:', error);
        throw error;
    });
};

export const getUserData = (uid) => {

    return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};

export const getAllUsers = async () => {
    try {
        const snapshot = await get(ref(db, 'users'));
        return snapshot.val();
    } catch (error) {
        console.log(error.message);
    }
    return null;
};

export const getBooksDonatedByUser = async (currentUser) => {
    const users = await getAllUsers();
    const user = Object.values(users).find(user => user.uid === currentUser.uid);
    const books = await viewAllBooks();
    const donatedBooks = [];
    for (const book of Object.values(books)) {
        if (book.donatedBy === user.handle) {
            donatedBooks.push(book);
        }
    }
    return donatedBooks;

}
