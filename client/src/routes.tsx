import * as React from "react";
import { RouteKey } from "./constants";
import { EnterCargoScreen } from "./modules/enterCargoScreen";
import { ConfirmCargoScreen } from "./modules/confirmCargoScreen";
import { DeckMapContainer } from "./modules/deckMap";
import { LoginScreen } from "./modules/loginScreen";
import { RouteProps } from "react-router-dom";
import SettingsScreen from "./modules/settingsScreen";
import HistoryScreen from "./modules/historyScreen";
import { NoMatchScreen } from "./modules/noMatchScreen";
import { Transition, Variants } from "framer-motion";

interface Props {
  title: string;
  private: boolean;
  exact: boolean;
  path: string;
  component: React.ReactNode;
  routeProps?: RouteProps;
  variants?: Variants;
  transition?: Transition;
}
// const defaultVariant = {
//   initial: {
//     opacity: 0,
//     x: "100vw",
//     y: "0",
//   },
//   in: {
//     opacity: 1,
//     x: "0",
//     y: "0",
//   },
//   out: {
//     opacity: 0,
//     x: "-100vw",
//     y: "0",
//   },
// };
// const defaultTransition = {
//   transition: "linear",
// };
export const routes: { [key in RouteKey]: Props } = {
  [RouteKey.Login]: {
    title: "Login",
    private: false,
    exact: true,
    path: "/login",
    component: <LoginScreen />,
  },
  [RouteKey.PlaceCargo]: {
    title: "Initiate cargo placement",
    private: true,
    exact: true,
    path: "/placecargo",
    component: <EnterCargoScreen />,
    // variants: { ...defaultVariant, initial: { ...defaultVariant.initial, opacity: 1, x: "0" } },
    // transition: defaultTransition
  },
  [RouteKey.PlaceCargoConfirm]: {
    title: "Cargo confirmation",
    private: true,
    exact: true,
    path: "/placecargo/confirmcargo",
    component: <ConfirmCargoScreen />,
    // variants: defaultVariant,
    // transition: defaultTransition
  },
  [RouteKey.PlaceCargoDeckMap]: {
    title: "Place cargo",
    private: true,
    exact: true,
    path: "/placecargo/deckmap",
    component: <DeckMapContainer isOverview={false} />,
  },
  [RouteKey.DeckOverview]: {
    title: "Move/dischage cargo",
    private: true,
    exact: true,
    path: "/overview",
    component: <DeckMapContainer isOverview={true} />,
  },
  [RouteKey.History]: {
    title: "History",
    private: true,
    exact: true,
    path: "/history",
    component: <HistoryScreen />,
  },
  // [RouteKey.Discharge]: {
  //   title: "Discharge cargo",
  //   private: true,
  //   exact: true,
  //   path: "/discharge",
  //   component: <div>Discharge</div>,
  // },
  [RouteKey.Settings]: {
    title: "Settings",
    private: true,
    exact: true,
    path: "/settings",
    component: <SettingsScreen />,
  },
  [RouteKey.NoMatch]: {
    title: "No matching page",
    private: true,
    exact: false,
    path: "*",
    component: <NoMatchScreen />,
  },
};
