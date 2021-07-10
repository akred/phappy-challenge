import { Redirect } from 'react-router-dom'
import AuthService from '../services/AuthService'
import { LOGIN_URL } from '../helpers/urls'
import { useAuth } from "../helpers/AppContext";

const Logout = () => {
    const { setIsAuthenticated } = useAuth();
    setIsAuthenticated(false);
    AuthService.logout();
    return (
        <div>
            <Redirect to={LOGIN_URL} />
        </div>
    );
}

export default Logout;
