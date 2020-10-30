import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { routes } from '../../routes';

export const NoMatchScreen: React.FC = () => {
  const history = useHistory();
  useEffect(() => {
    history.push(routes.PlaceCargo.path);
  }, [])
  return null;
}

export default NoMatchScreen