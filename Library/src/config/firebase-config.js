import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAkloqlgBLVphb2eqbo1COkT5KScHPGDSU",
    authDomain: "the-book-thief-7ad8d.firebaseapp.com", 
     projectId: "the-book-thief-7ad8d",
     storageBucket: "the-book-thief-7ad8d.appspot.com", 
     messagingSenderId: "715778696545", 
     appId: "1:715778696545:web:fe1aa09397c9a4b1399120",
     measurementId: "G-V1ZN3TV1JZ",
     databaseURL: "https://the-book-thief-7ad8d-default-rtdb.europe-west1.firebasedatabase.app",
   
 
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
// Initialize Firebase
export const analytics = getAnalytics(app);
