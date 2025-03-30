// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Check for authentication token

  return isAuthenticated ? Component : <Navigate to="/login" />;
};

export default PrivateRoute;
