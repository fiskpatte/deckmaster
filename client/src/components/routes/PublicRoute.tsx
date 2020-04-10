import React from "react";
import { Route, RouteProps } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode,
  path: string,
  exact?: boolean,
  routeProps?: RouteProps
}

const PublicRoute: React.FC<PrivateRouteProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <Route
      {...rest}
    >
      {children}
    </Route>
  );
}

export default PublicRoute;