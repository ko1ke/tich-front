import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const currentUser = useSelector((state: RootState) => state.currentUser);
  return currentUser.isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
