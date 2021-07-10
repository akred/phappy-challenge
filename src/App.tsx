import "./App.scss";
import Login from "./components/Login";
import Logout from "./components/Logout";
import CallList from "./components/CallList";
import CallDetail from "./components/CallDetail";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import AuthRoute from "./helpers/AuthRoute";
import {
  LOGIN_URL,
  CALL_LIST_URL,
  CALL_DETAIL_URL,
  LOGOUT_URL,
} from "./helpers/urls";
import { ProvideAuth } from "./helpers/AppContext";

export default function App() {
  return (
    <div className="phappy-container container">
      <ProvideAuth>
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to={LOGIN_URL} />
            <Route path={LOGIN_URL}>
              <Login />
            </Route>
            <AuthRoute path={LOGOUT_URL} component={Login} />
            <AuthRoute path={CALL_LIST_URL} component={CallList} />
            <AuthRoute path={CALL_DETAIL_URL} component={CallDetail} />
          </Switch>
        </BrowserRouter>
      </ProvideAuth>
    </div>
  );
}
