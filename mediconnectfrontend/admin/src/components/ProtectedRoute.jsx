import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import { DoctorContext } from "../context/DoctorContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  if (!aToken && !dToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
