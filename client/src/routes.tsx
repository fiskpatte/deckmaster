import * as React from 'react';
import { RouteKey } from './shared/constants';
import { EnterCargoScreen } from './modules/enterCargoScreen';
import { ConfirmCargoScreen } from './modules/confirmCargoScreen';
import { DeckMapContainer } from './modules/deckMap';
import { LoginScreen } from './modules/loginScreen';
import { RouteProps } from 'react-router-dom';

interface Props {
  title: string;
  private: boolean;
  exact: boolean;
  path: string;
  component: React.ReactNode;
  routeProps?: RouteProps;
}

export const routes: { [key in RouteKey]: Props } = {
  [RouteKey.Login]: {
    title: 'Login',
    private: false,
    exact: true,
    path: '/login',
    component: <LoginScreen />
  },
  [RouteKey.PlaceCargo]: {
    title: 'Initiate cargo placement',
    private: true,
    exact: true,
    path: '/placecargo',
    component: <EnterCargoScreen />
  },
  [RouteKey.PlaceCargoConfirm]: {
    title: 'Cargo confirmation',
    private: true,
    exact: true,
    path: '/placecargo/confirmcargo',
    component: <ConfirmCargoScreen />
  },
  [RouteKey.PlaceCargoDeckMap]: {
    title: 'Place cargo',
    private: true,
    exact: true,
    path: '/placecargo/deckmap',
    component: <DeckMapContainer />
  },
  [RouteKey.DeckOverview]: {
    title: 'Deck overview',
    private: true,
    exact: true,
    path: '/overview',
    component: <div>Overview</div>
  },
  [RouteKey.History]: {
    title: 'History',
    private: true,
    exact: true,
    path: '/history',
    component: <div>History</div>
  },
  [RouteKey.Discharge]: {
    title: 'Discharge cargo',
    private: true,
    exact: true,
    path: '/discharge',
    component: <div>Discharge</div>
  },
  [RouteKey.Settings]: {
    title: 'Settings',
    private: true,
    exact: true,
    path: '/settings',
    component: <div>Settings</div>
  },
  [RouteKey.NoMatch]: {
    title: 'No matching page',
    private: true,
    exact: false,
    path: "*",
    component: <div>NO MATCH!</div>
  }
}