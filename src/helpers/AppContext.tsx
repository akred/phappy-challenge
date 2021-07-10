import { ReactNode, createContext, useContext, useState } from "react";
import AuthService from "../services/AuthService";

/**
 * This file manage the redirection is user is authenticated or not
 * Source : https://usehooks.com/useAuth/
 */

type ProvideAuthProps = {
  children: ReactNode;
};

export type ContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

export const authContext = createContext<ContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => useContext(authContext);

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export const ProvideAuth = (props: ProvideAuthProps) => {
  const { children } = props;
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    AuthService.isAuthenticated()
  );
  return (
    <authContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </authContext.Provider>
  );
};
