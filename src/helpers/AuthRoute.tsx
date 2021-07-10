import React from "react";
import { Route, Redirect } from "react-router-dom";
import { LOGIN_URL } from "./urls";
import {useAuth} from "./AppContext"

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
  // Get auth state and re-render anytime it changes
  const {isAuthenticated} = useAuth();
  if (isAuthenticated) {
    return (
      <Route
        path={props.path}
        exact={props.exact}
        component={props.component}
      />
    );
  } else {
    return <Redirect to={LOGIN_URL} />;
  }
};
export default AuthRoute;
