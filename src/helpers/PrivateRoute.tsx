import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../services/AuthService";

const PrivateRoute: React.FC<{
  component: React.FC;
  path: string;
  exact?: boolean;
}> = (props) => {
  const condition = !!AuthService.isAuthenticated();

  return condition ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/login" />
  );
};
export default PrivateRoute;
