import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from "../images/logo.png";
import MyProfile from '../components/MyProfile';
import {auth} from '../config/firebase-config';



const NavBar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
          setCurrentUser(user);
      });
      return () => unsubscribe();
  }, []);

      const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    
        return (
          <div className="bg-gray-800 text-white">
              <header className="container mx-auto flex items-center justify-between py-4">
                  <nav>
                      <ul className="flex space-x-4">
                          <li>
                              <Link to="/" className="nav-link hover:underline">Начало</Link>
                          </li>
                          <li>
                              <Link to="/donateBook" className="nav-link hover:underline">Дари книга</Link>
                          </li>
                          <li>
                              <Link to="/allBooks" className="nav-link hover:underline">Всички книги</Link>
                          </li>
                      </ul>
                  </nav>
                  <Link to="/" className="flex items-center">
                      <img src={logo} className="h-10 md:h-auto w-auto mr-2 rounded-full" alt="logo" style={{ maxWidth: "150px" }} />
                  </Link>
                  <div className="md:hidden">
                      <button onClick={toggleMenu} className="focus:outline-none">
                          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                              <path
                                  d="M4 6h16M4 12h16M4 18h16"
                              />
                          </svg>
                      </button>
                  </div>
                  {isMenuOpen && (
                      <div className="md:hidden absolute top-full left-0 bg-gray-800 w-full">
                          <ul className="flex flex-col space-y-2 p-4">
                              <li>
                                  <Link to="/" className="nav-link hover:underline">Начало</Link>
                              </li>
                              <li>
                                  <Link to="/donateBook" className="nav-link hover:underline">Дари книга</Link>
                              </li>
                              <li>
                                  <Link to="/allBooks" className="nav-link hover:underline">Всички книги</Link>
                              </li>
                          </ul>
                      </div>
                  )}
                  <div className="hidden md:block">
                      {currentUser && <MyProfile />}
                  </div>
              </header>
          </div>
      );
}

export default NavBar;