import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase-config";
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
      <button onClick={toggleOpen}>{userData}</button>
      {isOpen && (
        <ul>
          <li><Link to="/myBooks">Моите книги</Link></li>
          <li><Link to="/myDonations">Дарения</Link></li>
          <li><Link to="/allTakenBooks">Всички взети книги</Link></li>
          <li> <LogOut /> </li>
        </ul>
      )}
    </div>
  );
}

export default MyProfile;