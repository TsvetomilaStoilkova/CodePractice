import { Link } from 'react-router-dom';
import logo from "../../images/logo.png";
import MyProfile from '../MyProfile/MyProfile';
import "./NavBar.css";


const NavBar = () => {
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
                <MyProfile />
                
            </header>
        </div>
    )
}

export default NavBar;