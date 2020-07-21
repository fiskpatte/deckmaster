import * as React from "react";
import { RouteKey } from "./constants";
import { routes } from "./routes";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";

export const renderRoutes = () =>
  Object.keys(routes).map((key, ix) =>
    renderRoute(RouteKey[key as keyof typeof RouteKey], ix)
  );

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
  );
  let routeKey = (key ?? RouteKey.NoMatch) as keyof typeof RouteKey;
  return routes[routeKey].title;
};
