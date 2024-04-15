import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import {loginUser, logoutUser } from '../../services/auth.service';
import SignIn from '../../components/SignIn/SignIn';


const Home = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleLogin = async (email, password) => {
    try {
      await loginUser(email, password);
      setIsSignedIn(true);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }


  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsSignedIn(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="home">
      {isSignedIn ? (
        <div>
          <h1>Welcome back!</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Please sign in to continue</h1>
          <SignIn onLogin={handleLogin} />
          <p>Don't have an account?</p>
          <button className="signUp-Button">
                <Link to="/signUp">Sign Up</Link>
            </button>
        </div>
      )}
    </div>
  );
};

export default Home;