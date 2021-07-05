import React from "react";
import { Route, Redirect } from "react-router-dom";
import CallList from "../components/CallList";
import AuthService from "../services/AuthService";
import { LOGIN_URL, LOGOUT_URL } from "./urls";

/**
 * This function component manage the redirection if user is logged or not
 * @param props
 * @returns
 */
const AuthRoute: React.FC<{
  component: React.FC;
  path: string;
  exact?: boolean;
}> = (props) => {
  if (LOGOUT_URL === props.path) {
    AuthService.logout()
  }
  if (AuthService.isAuthenticated()) {
    return (<Route path={props.path} exact={props.exact} component={props.component} />);
  } else {
    return (<Redirect to="/login" />)
  };
};
export default AuthRoute;
