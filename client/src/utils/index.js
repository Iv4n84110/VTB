import React, { useState, useCallback, useEffect } from "react";
import { Main, Admin } from "../pages";
import { Route, Switch, Redirect } from "react-router-dom";
import { createContext } from "react";

function noop() {}

export const AuthContext = createContext({
  token: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
});

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path="/admin/:params" component={Admin} />
        <Redirect to="/admin/create" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Redirect to="/" />
    </Switch>
  );
};

export const Auth = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const login = useCallback((jwtToken) => {
    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("token");
    if (data) {
      login(data);
    }
  }, [login]);

  return { token, login, logout };
};

export async function fetchRequest(
  url,
  rejectHandler,
  responseHandler,
  headers = {},
  method = "GET",
  body
) {
  const response = await fetch(url, {
    method: method,
    headers: headers,
    body: body ? JSON.stringify(body) : null,
  });
  if (!response.ok) {
    if (response.status === 401) {
      console.log("401");
      rejectHandler(401);
    } else rejectHandler(await response.json());
  } else responseHandler(await response.json());
}
