import { createContext } from 'react';

export interface AuthenticatedContext {
  isAuthenticated: boolean;
}

export default createContext<AuthenticatedContext>({
  isAuthenticated: false
});
