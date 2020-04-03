import * as React from 'react';
import { RouteKey } from "./shared/constants";
import { routes } from './routes';
import PrivateRoute from './shared/components/routes/PrivateRoute';
import PublicRoute from './shared/components/routes/PublicRoute';

export const renderRoutes = () => {
  return (
    Object.keys(routes).map((key, ix) => {
      return renderRoute(RouteKey[key as keyof typeof RouteKey], ix);
    })
  );
}

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
}