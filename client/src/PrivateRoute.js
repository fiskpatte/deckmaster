import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "./shared/functions/auth";
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return isLoggedIn() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default PrivateRoute;
