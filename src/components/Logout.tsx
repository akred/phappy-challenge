import { Redirect, Route } from 'react-router-dom'
import AuthService from '../services/AuthService'
import { LOGIN_URL } from '../helpers/urls'

const Logout = () => {
    return (
        <div>
            <Route exact path="/logout">
                {AuthService.logout()}
                <Redirect to={LOGIN_URL} />
            </Route>
        </div>
    );
}

export default Logout;
