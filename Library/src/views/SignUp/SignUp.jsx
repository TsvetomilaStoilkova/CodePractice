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
            <h1>Регистрация</h1>
            <p>Моля, попълни формата, за да се регистрираш в нашата библиотека</p>
            <form onSubmit={handleSubmit}>
                <label>Име</label>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label>Фамилия</label>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <label>Потребителско име</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <label>Имейл</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Парола</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />
                <button type="submit">Регистрация</button>
            </form>
        </div>
    )
}

export default SignUp;