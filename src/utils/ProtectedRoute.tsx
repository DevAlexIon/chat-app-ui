import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateWrapperProps {
  auth: {
    isAuthenticated: boolean;
  };
}

const PrivateWrapper: React.FC<PrivateWrapperProps> = ({ auth }) => {
  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateWrapper;
