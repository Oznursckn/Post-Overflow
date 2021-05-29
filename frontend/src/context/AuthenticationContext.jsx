import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import authService from "../services/authService";

export const AuthenticationContext = createContext(null);

export function AuthenticationProvider({ children }) {
  const [authenticatedUser, setAuthenticatedUser] = useState();

  useEffect(() => {
      const authCookie = authService.getAuthenticatedUser();
      if(authCookie){
        setAuthenticatedUser({...authCookie});
      }else{
        setAuthenticatedUser(null);
      }
  });

  return (
    <AuthenticationContext.Provider value={authenticatedUser}>
      {children}
    </AuthenticationContext.Provider>
  );
}
