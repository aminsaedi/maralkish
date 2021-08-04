import { useContext } from "react";
import jwtDecode from "jwt-decode";
import AuthContext from "./context";
import authStorage from "./storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logout = () => {
    setUser(null);
    authStorage.removeTokens();
  };

  const login = (authToken, refreshToken) => {
    const user = jwtDecode(authToken);
    setUser(user);
    authStorage.setToken(authToken);
    authStorage.setRefreshToken(refreshToken);
  };

  return { user, setUser, logout, login };
};
