import { useContext, useState } from "react";
import { AppContext } from "../../providers/AppContext";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth.service";
import { createUserHandle, getUserByHandle } from "../../services/users.service";

const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const { setContext } = useContext(AppContext);
    const navigate = useNavigate();



    const handleSubmit = async (event) => {
        event.preventDefault();

        const firstName = event.target.elements.firstName.value;
        const lastName = event.target.elements.lastName.value;
        const userName = event.target.elements.username.value;
        const email = event.target.elements.email.value;
        const pass = event.target.elements.password.value;


        const user = await getUserByHandle(userName);
        if (user.exists()) {
            alert(`Handle @${userName} already exists`, "error");
            return;
        }


        try {
            const credentials = await registerUser(email, pass);
            await createUserHandle(
                firstName,
                lastName,
                userName,
                credentials.user.uid,
                email,
            );

            setContext({ user, userData: null });
            navigate("/");
            setFirstName("");
            setLastName("");
            setUserName("");
            setEmail("");
            setPass("");

        } catch (error) {
            alert("Invalid email or password", "error");
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <p>Sign up to create an account</p>
            <form onSubmit={handleSubmit}>
                <label>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label>Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp;