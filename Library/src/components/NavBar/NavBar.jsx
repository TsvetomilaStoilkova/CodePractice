import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from "../../images/logo.png";
import MyProfile from '../MyProfile/MyProfile';
import Home from '../../pages/Home/Home';
import {auth} from '../../config/firebase-config';
import "./NavBar.css";


const NavBar = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          setCurrentUser(user);
        });
        return () => unsubscribe();
      }, []);


        return (
            <div className="App-NavBar">
              <header>
                <Link to="/">
                  <img src={logo} className="App-logo" alt="logo" />
                </Link>
                <button>
                  <Link to="/">Начало</Link>
                </button>
                <button>
                  <Link to="/donateBook">Дари книга</Link>
                </button>
                <button>
                  <Link to="/allBooks">Всички книги</Link>
                </button>
                {currentUser && <MyProfile />}
              </header>
            </div>
          );
}

export default NavBar;