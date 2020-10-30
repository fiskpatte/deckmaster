import * as React from "react";
import { RouteKey } from "./constants";
import { routes } from "./routes";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import './routes.scss';
import { motion } from "framer-motion";

export const renderRoutes = () =>
  Object.keys(routes).map((key) =>
    renderRoute(key)
  );

export const renderRoute = (key: string) => {
  const route = routes[key as keyof typeof RouteKey];
  const Route = route.private ? PrivateRoute : PublicRoute;
  return (
    <Route
      key={key}
      exact={route.exact}
      path={route.path}
      routeProps={route.routeProps}
    >
      <motion.div
        className="RouteContainer"
        initial="initial"
        animate="in"
        exit="out"
        variants={route.variants}
        transition={route.transition}
      >
        {route.component}
      </motion.div>
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
