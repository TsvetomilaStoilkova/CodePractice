import { useState } from "react";
import { Link } from "react-router-dom";
import './MyProfile.css';

const MyProfile = ({currentUser}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  
  return (
    <div>
      <button onClick={toggleOpen}>My profile</button>
      {isOpen && (
        <ul>
          <li>{currentUser}</li>
          <li><Link to="/my-books">My books</Link></li>
          <li><Link to="/myDonations">My donations</Link></li>
        </ul>
      )}
    </div>
  );
}

export default MyProfile;