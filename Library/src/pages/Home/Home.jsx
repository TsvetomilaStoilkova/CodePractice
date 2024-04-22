import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { loginUser} from '../../services/auth.service';
import {auth} from '../../config/firabase-config';
import SignIn from '../../components/SignIn/SignIn';


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
    <div className="home">
      {isSignedIn ? (
        <div>
          <h1>Добре дошъл!</h1>
        </div>
      ) : (
        <div>
          <h1>Моля впиши се, за да продължиш:</h1>
          <SignIn onLogin={handleLogin} />
          <p>Не си се регистрирал, лесно е! Натисни регистрация и попълни полето</p>
          <button className="signUp-Button">
            <Link to="/signUp">Регистрация</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;