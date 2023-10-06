import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  if (!loading && !isAuthenticated) {
    navigate("/login");
  }
  return <>{!loading && <Component {...rest}/>}</>;
};

export default ProtectedRoute;
