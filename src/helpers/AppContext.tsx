import { ReactNode, createContext, useContext } from "react";
import AuthService from "../services/AuthService";

/**
 * This file manage the redirection is user is authenticated or not
 * Source : https://usehooks.com/useAuth/
 */

type ProvideAuthProps = {
  children: ReactNode
}

const authContext = createContext({ isAuthenticated : false });

const useProvideAuth = () => {
  return { isAuthenticated : AuthService.isAuthenticated() };
}

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export const ProvideAuth =  (props: ProvideAuthProps) => {
  const { children } = props;
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () =>  {
  return useContext(authContext);
}
