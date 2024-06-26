import {logoutUser} from '../services/auth.service';
import {useNavigate} from 'react-router-dom';



const LogOut = () => {

    const navigate = useNavigate();


    const handleLogOut = async () => {
        try {
            await logoutUser();
            navigate('/'); 

        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    }

    return (
        <button onClick={handleLogOut}>Излез</button>
    )
}

export default LogOut;
