import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { customer } = useSelector((state) => state.customerAuth);
  const hasToken = localStorage.getItem("customerToken");

  if (!customer && !hasToken) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
