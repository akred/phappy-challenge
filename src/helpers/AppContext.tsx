import { createContext } from 'react';
import AuthService from '../services/AuthService';

const AppContext = createContext({isAuthenticated: false});

export default AppContext;