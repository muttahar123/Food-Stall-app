import { createContext, useState } from "react";

//? Create context for auth
export const AuthContext = createContext();

//? Create context provider
export function AuthContextProvider({ children }) {
  //* Initially set the state to null
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  //* Return the AuthContext.Provider with the value of user and setUser
  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
