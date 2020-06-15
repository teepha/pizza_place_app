import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "./AuthContext";
import { removeToken, getLocalStorageItem } from "../../utils/helpers";

const AuthProvider = ({ children }) => {
  let history = useHistory();
  const [token, setToken] = useState(null);

  const updateToken = () => setToken(getLocalStorageItem("customerToken"));

  const signOut = () => {
    removeToken();
    setToken("");
    localStorage.clear();
    history.push("/");
  };

  useEffect(() => {
    const token = getLocalStorageItem("customerToken");
    setToken(token);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        updateToken,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
