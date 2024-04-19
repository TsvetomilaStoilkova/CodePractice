import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../config/firabase-config";
import {getUserByUid} from '../../services/users.service';
import LogOut from "../LogOut/LogOut";
import './MyProfile.css';

const MyProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUser] = useState(null);
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (currentUser) {
      getUserByUid(currentUser.uid)
        .then(userData => {
          setUser(userData);
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [currentUser]);


  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div>
      <button onClick={toggleOpen}>{userData} Profile</button>
      {isOpen && (
        <ul>
          <li><Link to="/myBooks">My books</Link></li>
          <li><Link to="/myDonations">My donations</Link></li>
          <li> <LogOut /> </li>
        </ul>
      )}
    </div>
  );
}

export default MyProfile;