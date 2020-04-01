import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { isLoggedIn } from "../functions/auth";

interface PrivateRouteProps {
  children: React.ReactNode,
  path: string,
  exact?: boolean,
  routeProps?: RouteProps
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props: PrivateRouteProps) => {
  const { children, ...rest } = props;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn() ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

export default PrivateRoute;