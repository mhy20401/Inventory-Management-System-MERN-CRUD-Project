import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken'); // Check for the token

  if (!token) {
    // If token is not present, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If token is present, allow access to the route
  return children;
};

export default ProtectedRoute;
