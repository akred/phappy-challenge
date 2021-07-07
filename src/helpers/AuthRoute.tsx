import React from "react";
import { Route, Redirect } from "react-router-dom";
import AppContext from "./AppContext";

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
  return (
    <AppContext.Consumer>
      {({ isAuthenticated }) => {
        if (isAuthenticated) {
          return (
            <Route
              path={props.path}
              exact={props.exact}
              component={props.component}
            />
          );
        }
        return <Redirect to="/login" />;
      }}
    </AppContext.Consumer>
  );
};
export default AuthRoute;
