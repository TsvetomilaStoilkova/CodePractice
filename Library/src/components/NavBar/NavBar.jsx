import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from "../../images/logo.png";
import MyProfile from '../MyProfile/MyProfile';
import {auth} from '../../config/firabase-config';
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
                  <Link to="/donateBook">Donate Book</Link>
                </button>
                <button>
                  <Link to="/allBooks">All Books</Link>
                </button>
                {currentUser && <MyProfile />}
              </header>
            </div>
          );
}

export default NavBar;