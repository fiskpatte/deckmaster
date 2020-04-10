import React from "react";
import { Route, Redirect, RouteProps, useLocation } from "react-router-dom";
import { isLoggedIn } from "../../functions/auth";

interface PrivateRouteProps {
  children: React.ReactNode;
  path: string;
  exact?: boolean;
  routeProps?: RouteProps;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const { children, ...rest } = props;
  const location = useLocation();

  if (!isLoggedIn()) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location },
        }}
        from={location.pathname}
        exact
      />
    );
  }
  return <Route {...rest}>{children}</Route>;
};

export default PrivateRoute;
