import { createContext } from "react";

// function AuthContext() {
//   createContext({ isLoggedIn: false, login: () => {}, logout: () => {} });
// }

// export default AuthContext;

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
});
