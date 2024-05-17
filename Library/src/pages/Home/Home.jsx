import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { loginUser} from '../../services/auth.service';
import {auth} from '../../config/firebase-config';
import SignIn from '../../components/SignIn';


const Home = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setIsSignedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await loginUser(email, password);
      setIsSignedIn(true);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };



  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-md px-6 py-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Добре дошли в нашата читалищна!</h1>
        <p className="text-lg text-gray-700 mb-6">Влезте в света на книгите и открийте безкрайни приключения и знания.</p>
        {isSignedIn ? (
          <h2 className="text-xl font-semibold mb-4">Добре дошъл, {currentUser.displayName || currentUser.email}!</h2>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-2">Влезте в своя акаунт или се регистрирайте, за да започнете да четете.</h2>
            <SignIn onLogin={handleLogin} />
            <p className="text-gray-700 mt-2">Не сте се регистрирали? Не се притеснявайте, регистрацията е лесна!</p>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4">
              <Link to="/signUp">Регистрация</Link>
            </button>
          </div>
        )}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">Открийте следните възможности:</h2>
          <ul className="list-disc pl-6">
            <li>Регистрация на потребители</li>
            <li>Добавяне на нови книги</li>
            <li>Търсене на книги</li>
            <li>Заемане и връщане на книги</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;