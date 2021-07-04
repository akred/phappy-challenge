
import './App.scss'
import Login from './components/Login'
import CallList from './components/CallList'
import CallDetail from './components/CallDetail'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import PrivateRoute from './helpers/PrivateRoute'
import { LOGIN_URL, CALL_LIST_URL, CALL_DETAIL_URL} from './helpers/urls'

export default function App() {

  return (
    <div className="phappy-container container">
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to={LOGIN_URL}/>
          <Route path={LOGIN_URL}>
            <Login />
          </Route>
          <PrivateRoute path={CALL_LIST_URL} component={CallList} />
          <PrivateRoute path={CALL_DETAIL_URL} component={CallDetail} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}