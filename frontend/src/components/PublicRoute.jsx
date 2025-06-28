import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  if (currentUser) {
    return <Navigate to="/" replace />; // or redirect to "/profile" or "/products"
  }

  return children;
};

export default PublicRoute;
