import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import React, { useEffect } from "react";

import { logoutSuccess } from "../features/auth/authSlice";
import isTokenExpired from "../utils/isTokenExpired";

function PrivateRouter({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    // Validate token on component mount
    const token = localStorage.getItem("echoToken");
    if (!token) {
      dispatch(logoutSuccess());
    }
  }, [dispatch, location.pathname]);

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}

export default PrivateRouter;
