import React from 'react';
import { loginUser } from '../../services/auth.service';
import './SignIn.css';


const SignIn = ({ onLogin }) => {
    const handleLogin = async (email, password) => {
        try {
            await loginUser(email, password);
      
            onLogin(email, password);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }

    return (
        <div>
            <form className="signIn-Form" onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.email.value;
                const password = e.target.password.value;
                handleLogin(email, password);
            }}>
                <label>Insert your email</label>
                <br />
                <input type="text" name="email" placeholder="Email" />
                <br />
                <label>Insert your password</label>
                <br />
                <input type="password" name="password" placeholder="Password" />
               <br />
                <button type="submit">Sign In</button>
            </form>
        </div>
    )
}

export default SignIn;