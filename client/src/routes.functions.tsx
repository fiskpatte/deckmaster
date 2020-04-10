import * as React from "react";
import { RouteKey } from "./constants";
import { routes } from "./routes";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";

export const renderRoutes = () => {
  return Object.keys(routes).map((key, ix) => {
    return renderRoute(RouteKey[key as keyof typeof RouteKey], ix);
  });
};

export const renderRoute = (key: RouteKey, index: number) => {
  const route = routes[key];
  const Route = route.private ? PrivateRoute : PublicRoute;
  return (
    <Route
      key={index}
      exact={route.exact}
      path={route.path}
      routeProps={route.routeProps}
    >
      {route.component}
    </Route>
  );
};

export const getRouteTitleFromPath = (path: string): string => {
  let key = Object.keys(routes).find(
    (key) => routes[key as keyof typeof RouteKey].path === path
  ) as keyof typeof RouteKey;
  return routes[key].title;
};
