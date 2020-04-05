import * as React from 'react';
import { RouteKey } from './shared/constants';
import { EnterCargoScreen } from './modules/enterCargoScreen';
import { ConfirmCargoScreen } from './modules/confirmCargoScreen';
import { DeckMapContainer } from './modules/deckMap';
import { LoginScreen } from './modules/loginScreen';
import { RouteProps } from 'react-router-dom';

interface Props {
  private: boolean;
  exact: boolean;
  path: string;
  component: React.ReactNode;
  routeProps?: RouteProps;
}

export const routes: { [key in RouteKey]: Props } = {
  [RouteKey.Login]: {
    private: false,
    exact: true,
    path: '/login',
    component: <LoginScreen />
  },
  [RouteKey.PlaceCargo]: {
    private: true,
    exact: true,
    path: '/placecargo',
    component: <EnterCargoScreen />
  },
  [RouteKey.PlaceCargoConfirm]: {
    private: true,
    exact: true,
    path: '/placecargo/confirmcargo',
    component: <ConfirmCargoScreen />
  },
  [RouteKey.PlaceCargoDeckMap]: {
    private: true,
    exact: true,
    path: '/placecargo/deckmap',
    component: <DeckMapContainer />
  },
  [RouteKey.History]: {
    private: true,
    exact: true,
    path: '/history',
    component: <div>History</div>
  },
  [RouteKey.Discharge]: {
    private: true,
    exact: true,
    path: '/discharge',
    component: <div>Discharge</div>
  },
  [RouteKey.Settings]: {
    private: true,
    exact: true,
    path: '/settings',
    component: <div>Settings</div>
  },
  [RouteKey.NoMatch]: {
    private: true,
    exact: false,
    path: "*",
    component: <div>NO MATCH!</div>
  }
}