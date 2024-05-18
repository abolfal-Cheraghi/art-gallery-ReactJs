JavaScript

import { useState, useContext, createContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["authToken"]);

  const authToken = cookies.authToken;

  useEffect(() => {
    if (authToken) {
      setAuthUser({ authenticated: true });
    }
  }, []);
  const handleLogin = async () => {
    try {
      let response;
      if (response.status === 200) {
        axios.post(
          "https://api.marvelcommodity.com/api/v2/users/me",
          response.data
        );
        setAuthUser(response.data);
        setCookie(authToken, response.data);
        console.log("Login successful:", response.data);
        <Navigate to="/" />;
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("ورود ناموفق بود. لطفا دوباره تلاش کنید.");
    }
  }

  const logOut = () => {
    setAuthUser(null);
    removeCookie("authToken" , { path: "/" });
    <Navigate to="/" />;
  };
  // handleLogin
  const value = { authUser,  logOut, authToken };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;