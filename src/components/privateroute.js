import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  // Check if the user is authenticated (by checking for the authToken in localStorage)
  const isAuthenticated = !!localStorage.getItem('authToken');

  // If authenticated, render the child components. Otherwise, redirect to the home page
  return isAuthenticated ? children : <Navigate to="/" />;
}

export default PrivateRoute;
