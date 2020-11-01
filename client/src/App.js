import React from "react";

import { BrowserRouter } from "react-router-dom";
import { useRoutes, Auth, AuthContext } from "./utils";

function App() {
  const { token, login, logout } = Auth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isAuthenticated,
      }}
    >
      <BrowserRouter>{routes}</BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
